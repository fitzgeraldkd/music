import { useContext, useEffect } from "react"

import Analyzer from "../components/Analyzer"
import AudioPlayer from "../components/AudioPlayer"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"
import { BUCKET_URL } from "../utils/constants"

interface SongProps {
    audioPath?: string
    title?: string
}

export default function Song({ audioPath, title }: SongProps) {
    const { setSource, setTitle } = useContext(AudioPlayerContext)

    useEffect(() => {
        if (audioPath) {
            setSource(`${BUCKET_URL}/${audioPath}`)
            setTitle(title || null)
        }
    }, [audioPath])

    return (
        <>
            <AudioPlayer />
            <Analyzer />
        </>
    )
}
