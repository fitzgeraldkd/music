import { useContext } from "react"

import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame, type MeshProps } from "@react-three/fiber"

import { AnalyzerBoxStyles } from "./Analyzer.styles"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"
import useForceUpdate from "../hooks/useForceUpdate"

const FREQUENCY_BAR_MAX_HEIGHT = 255
const FREQUENCY_BAR_SIZE = 1
const FREQUENCY_BAR_GAP = 0.5

function useFrequencyData(analyzer: AnalyserNode, dataArray: Uint8Array, enabled: boolean) {
    const forceUpdate = useForceUpdate()
    analyzer.getByteFrequencyData(dataArray)
    if (enabled) requestAnimationFrame(forceUpdate)
}

const AnalyzerBox = styled(Box)(AnalyzerBoxStyles)

export default function Analyzer() {
    const { analyzer, status } = useContext(AudioPlayerContext)

    if (!analyzer) return null

    analyzer.fftSize = 256
    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    return (
        <AnalyzerBox>
            <Canvas>
                <ambientLight />
                <AnalyzerContent analyzer={analyzer} dataArray={dataArray} enabled={status === "playing"} />
                <PerspectiveCamera makeDefault manual position={[500, FREQUENCY_BAR_MAX_HEIGHT / 2, 200]} />
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
    height: number
    size: number
}

function FrequencyBar({ height, size, ...props }: FrequencyBarProps) {
    return (
        <mesh {...props}>
            <boxGeometry args={[size, height, size]} />
            <meshStandardMaterial color="red" />
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
        <>
            {Array.from(dataArray).map((value, index) => {
                const height = FREQUENCY_BAR_MAX_HEIGHT * value / 255
                return (
                    <FrequencyBar
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
        </>
    )
}

function CameraRig() {
    useFrame((state) => {
        state.camera.lookAt(0, FREQUENCY_BAR_MAX_HEIGHT / 2, 0)
    })
    return null
}
