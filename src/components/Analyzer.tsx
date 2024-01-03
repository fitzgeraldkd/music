import { useContext } from "react"

import { AudioPlayerContext } from "../contexts/AudioPlayerContext"
import useForceUpdate from "../hooks/useForceUpdate"

const MAX_HEIGHT = 256

function useFrequencyData(analyzer: AnalyserNode, dataArray: Uint8Array, enabled: boolean) {
    const forceUpdate = useForceUpdate()
    analyzer.getByteFrequencyData(dataArray)
    if (enabled) requestAnimationFrame(forceUpdate)
}

export default function Analyzer() {
    const { analyzer, status } = useContext(AudioPlayerContext)

    if (!analyzer) return null

    analyzer.fftSize = 256
    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    return <AnalyzerContent analyzer={analyzer} dataArray={dataArray} enabled={status === "playing"} />
}

interface AnalyzerContentProps {
    analyzer: AnalyserNode
    dataArray: Uint8Array
    enabled: boolean
}

/**
 * Keep useFrequencyData as low in the hierarchy as possible to minimize how many components get rerendered each
 * animation frame.
 * TODO: The frequency bands in the data are spaced linearly. It may provide a better visualization to make this exponential.
 */
function AnalyzerContent({ analyzer, dataArray, enabled }: AnalyzerContentProps) {
    useFrequencyData(analyzer, dataArray, enabled)

    return (
        <div style={{ alignItems: "flex-end", display: "flex", height: MAX_HEIGHT }}>
            {Array.from(dataArray).map((value, index) => (
                <div key={index} style={{ backgroundColor: "red", flexGrow: 1, height: MAX_HEIGHT * value / 256 }}></div>
            ))}
        </div>
    )
}
