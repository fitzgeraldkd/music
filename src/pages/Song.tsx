import { useContext, useEffect } from "react"

import AudioPlayer from "../components/AudioPlayer"
import Visualizer from "../components/Visualizer"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"
import { BUCKET_URL } from "../utils/constants"

interface SongProps {
    audioPath?: string
    title?: string
}

export default function Song({ audioPath, title }: SongProps) {
    const { audio, setSource, setTitle } = useContext(AudioPlayerContext)

    useEffect(() => {
        if (audioPath) {
            setSource(`${BUCKET_URL}/${audioPath}`)
            setTitle(title || null)
        }
        // Load a default song on the index route, if no other song has been loaded yet.
        else if (!audio) {
            setSource(`${BUCKET_URL}/misc/Undue.mp3`)
            setTitle("Undue")
        }
    }, [audioPath])

    return (
        <>
            <AudioPlayer />
            <Visualizer />
        </>
    )
}
