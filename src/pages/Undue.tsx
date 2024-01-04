import { useContext, useEffect } from "react"

import Analyzer from "../components/Analyzer"
import AudioPlayer from "../components/AudioPlayer"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"
import useTitle from "../hooks/useTitle"
import { AUDIO_FILE_PATHS, BUCKET_URL } from "../utils/constants"

export default function Undue() {
    const { setSource } = useContext(AudioPlayerContext)

    useEffect(() => {
        setSource(`${BUCKET_URL}/${AUDIO_FILE_PATHS.misc.undue}`)
    }, [])
    useTitle("Undue")

    return (
        <>
            <AudioPlayer />
            <Analyzer />
        </>
    )
}
