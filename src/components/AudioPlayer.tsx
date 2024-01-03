import { useContext } from "react"

import { AudioPlayerContext } from "../contexts/AudioPlayerContext"

export default function AudioPlayer() {
    const { audio, status } = useContext(AudioPlayerContext)

    const disabled = !audio
    const isPlaying = status === "playing"

    return (
        <div>
            <button disabled={disabled} onClick={() => isPlaying ? audio?.pause() : audio?.play()}>
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    )
}
