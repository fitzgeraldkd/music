import { useContext, useRef } from "react"

import Box from "@mui/material/Box"
import { darken, styled } from "@mui/material/styles"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Mesh } from "three"

import { AnalyzerBoxStyles } from "./Analyzer.styles"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"

const FREQUENCY_BAND_COUNT = 32
const FREQUENCY_BAR_GAP = 0
const FREQUENCY_BAR_MAX_HEIGHT = 100
const FREQUENCY_BAR_SIZE = 1
const SLICE_COUNT = 25

// TODO: Keeping the history is not required. Instead the slices can be updated from back to front, where each slice
// takes the height/scale from the slice in front of it. Then the slice at the very front gets its properties from
// getByteFrequencyData.
const frequencyDataHistory: number[][] = [...Array(SLICE_COUNT)].map(_ => Array(FREQUENCY_BAND_COUNT).fill(0))

const AnalyzerBox = styled(Box)(AnalyzerBoxStyles)

export default function Analyzer() {
    const { analyzer } = useContext(AudioPlayerContext)

    if (!analyzer) return null

    analyzer.fftSize = FREQUENCY_BAND_COUNT * 2
    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    return (
        <AnalyzerBox>
            <Canvas>
                <ambientLight />
                <pointLight intensity={500000} position={[20, FREQUENCY_BAR_MAX_HEIGHT * 1.5, 300]} />
                <OrbitControls enableDamping enablePan enableRotate enableZoom />
                <AnalyzerContent analyzer={analyzer} dataArray={dataArray} />
                <PerspectiveCamera makeDefault position={[100, FREQUENCY_BAR_MAX_HEIGHT / 2, 100]} />
                <CameraRig />
            </Canvas>
        </AnalyzerBox>
    )
}

interface AnalyzerContentProps {
    analyzer: AnalyserNode
    dataArray: Uint8Array
}

/**
 * TODO: The frequency bands in the data are spaced linearly. It may provide a better visualization to make this exponential.
 */
function AnalyzerContent({ analyzer, dataArray }: AnalyzerContentProps) {
    const gridRef = useRef<(Mesh | null)[][]>([...Array(SLICE_COUNT)].map(_ => Array(FREQUENCY_BAND_COUNT)))

    useFrame(() => {
        analyzer.getByteFrequencyData(dataArray)
        if (frequencyDataHistory.length >= SLICE_COUNT) {
            frequencyDataHistory.shift()
        }
        frequencyDataHistory.push(Array.from(dataArray))
        gridRef.current.map((slice, sliceIndex) => {
            slice.map((box, boxIndex) => {
                if (box) {
                    const height = FREQUENCY_BAR_MAX_HEIGHT * frequencyDataHistory[sliceIndex][boxIndex] / 255
                    box.scale.y = height
                    box.position.y = height / 2
                }
            })
        })
    })

    return (
        <group position={[0, -0.5 * FREQUENCY_BAR_MAX_HEIGHT, 0]}>
            {frequencyDataHistory.map((frequencyData, groupIndex) => (
                <group key={groupIndex} position={[0, 0, (groupIndex - frequencyDataHistory.length) * FREQUENCY_BAR_SIZE]}>
                    {frequencyData.map((_, index) => (
                        <mesh
                            ref={ref => gridRef.current[groupIndex][index] = ref}
                            key={index}
                            position={[
                                (index - (dataArray.length / 2)) * (FREQUENCY_BAR_GAP + FREQUENCY_BAR_SIZE),
                                0,
                                0,
                            ]}
                            scale={[FREQUENCY_BAR_SIZE, 0, FREQUENCY_BAR_SIZE]}
                        >
                            <boxGeometry args={[1, 1, 1]} />
                            <meshStandardMaterial color={darken("#FF0000", 1 - (groupIndex / (SLICE_COUNT - 1)))} />
                        </mesh>
                    ))}
                </group>
            ))}
        </group>
    )
}

function CameraRig() {
    useThree(state => state.camera.lookAt(0, FREQUENCY_BAR_MAX_HEIGHT / 2, 0))

    return null
}
