import { useContext } from "react"

import Box from "@mui/material/Box"
import { darken, styled } from "@mui/material/styles"
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame, type MeshProps } from "@react-three/fiber"

import { AnalyzerBoxStyles } from "./Analyzer.styles"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"
import useForceUpdate from "../hooks/useForceUpdate"

const FREQUENCY_BAR_GAP = 0
const FREQUENCY_BAR_MAX_HEIGHT = 100
const FREQUENCY_BAR_SIZE = 1
const SLICE_COUNT = 25

const frequencyDataHistory: number[][] = []

/**
 * TODO: Refactor this loop logic to use the useFrame hook.
 */
function useFrequencyData(analyzer: AnalyserNode, dataArray: Uint8Array, enabled: boolean) {
    const forceUpdate = useForceUpdate()
    analyzer.getByteFrequencyData(dataArray)
    if (frequencyDataHistory.length >= SLICE_COUNT) {
        frequencyDataHistory.shift()
    }
    frequencyDataHistory.push(Array.from(dataArray))
    if (enabled) requestAnimationFrame(forceUpdate)
}

const AnalyzerBox = styled(Box)(AnalyzerBoxStyles)

export default function Analyzer() {
    const { analyzer, status } = useContext(AudioPlayerContext)

    if (!analyzer) return null

    analyzer.fftSize = 64
    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    return (
        <AnalyzerBox>
            <Canvas>
                <ambientLight />
                <pointLight intensity={500000} position={[20, FREQUENCY_BAR_MAX_HEIGHT * 1.5, 300]} />
                <AnalyzerContent analyzer={analyzer} dataArray={dataArray} enabled={status === "playing"} />
                <PerspectiveCamera makeDefault position={[100, FREQUENCY_BAR_MAX_HEIGHT / 2, 100]} />
                <CameraRig />
            </Canvas>
        </AnalyzerBox>
    )
}

interface AnalyzerContentProps {
    analyzer: AnalyserNode
    dataArray: Uint8Array
    enabled: boolean
}

interface FrequencyBarProps extends MeshProps {
    color: string
    height: number
    size: number
}

/**
 * TODO: Instead of drawing each bar of each slice individually, it may perform better to merge the geometries of each
 * individual slice and render. The geometry could be memoized for the frames that the slice is visible, so only the
 * material changes to update the color, and the mesh's position changes.
 */
function FrequencyBar({ color, height, size, ...props }: FrequencyBarProps) {
    return (
        <mesh {...props}>
            <boxGeometry args={[size, height, size]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

/**
 * Keep useFrequencyData as low in the hierarchy as possible to minimize how many components get rerendered each
 * animation frame.
 * TODO: The frequency bands in the data are spaced linearly. It may provide a better visualization to make this exponential.
 */
function AnalyzerContent({ analyzer, dataArray, enabled }: AnalyzerContentProps) {
    useFrequencyData(analyzer, dataArray, enabled)

    return (
        <group position={[0, 5, 0]}>
            {frequencyDataHistory.map((frequencyData, groupIndex) => (
                <group key={groupIndex} position={[0, 0, (groupIndex - frequencyDataHistory.length) * FREQUENCY_BAR_SIZE]}>
                    {frequencyData.map((value, index) => {
                        const height = FREQUENCY_BAR_MAX_HEIGHT * value / 255
                        return (
                            <FrequencyBar
                                color={darken("#FF0000", 1 - (groupIndex / (SLICE_COUNT - 1)))}
                                key={index}
                                size={FREQUENCY_BAR_SIZE}
                                height={height}
                                position={[
                                    (index - (dataArray.length / 2)) * (FREQUENCY_BAR_GAP + FREQUENCY_BAR_SIZE),
                                    height / 2,
                                    0,
                                ]}
                            />
                        )
                    })}
                </group>
            ),
            )}
        </group>
    )
}

function CameraRig() {
    useFrame((state) => {
        state.camera.lookAt(0, FREQUENCY_BAR_MAX_HEIGHT / 2, 0)
    })
    return null
}
