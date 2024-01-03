import { useContext, useEffect } from "react"

import Analyzer from "../components/Analyzer"
import AudioPlayer from "../components/AudioPlayer"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"
import useTitle from "../hooks/useTitle"
import { BUCKET_URL } from "../utils/constants"

export default function Undue() {
    const { setSource } = useContext(AudioPlayerContext)

    useEffect(() => {
        setSource(`${BUCKET_URL}/misc/Undue.mp3`)
    }, [])
    useTitle("Undue")

    return (
        <>
            <AudioPlayer />
            <Analyzer />
        </>
    )
}
