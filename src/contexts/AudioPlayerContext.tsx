import { createContext, useEffect, useState } from "react"

import { Howl, Howler } from "howler"

import useTitle from "../hooks/useTitle"

export type AudioPlayerStatus = "paused" | "playing" | "stopped"

interface AudioPlayerContextInterface {
    analyzer: AnalyserNode | null
    audio: Howl | null
    source: string | null
    setSource: React.Dispatch<React.SetStateAction<string | null>>
    setTitle: React.Dispatch<React.SetStateAction<string | null>>
    status: AudioPlayerStatus
    title: string | null
}

export const AudioPlayerContext = createContext<AudioPlayerContextInterface>({} as AudioPlayerContextInterface)

interface AudioPlayerProviderProps {
    children: React.ReactNode
}

export function AudioPlayerProvider({ children }: AudioPlayerProviderProps) {
    const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null)
    const [audio, setAudio] = useState<Howl | null>(null)
    const [source, setSource] = useState<string | null>(null)
    const [status, setStatus] = useState<AudioPlayerStatus>("stopped")
    const [title, setTitle] = useState<string | null>(null)

    useTitle(title ? `${title} - Kenneth` : undefined)

    useEffect(() => {
        const initialLoad = !audio
        audio?.stop()
        if (!source) setAudio(null)
        else setAudio(new Howl({
            src: source,
            // Most browsers should block automatic playback on initial load anyway, but make sure audio plays
            // automatically whenever a new song is loaded.
            autoplay: !initialLoad,
            // Some workarounds are needed to make visualizers work when using HTML5.
            // @see https://github.com/goldfire/howler.js/issues/874
            html5: false,
            onend: () => setStatus("stopped"),
            onpause: () => setStatus("paused"),
            onplay: () => setStatus("playing"),
            onstop: () => setStatus("stopped"),
        }))
    }, [source])

    useEffect(() => {
        if (!analyzer && Howler.ctx) {
            const analyzer = Howler.ctx.createAnalyser()
            Howler.masterGain.connect(analyzer)
            setAnalyzer(analyzer)
        }
    }, [analyzer, Howler.ctx])

    return (
        <AudioPlayerContext.Provider value={{ analyzer, audio, setSource, source, status, title, setTitle }}>
            {children}
        </AudioPlayerContext.Provider>
    )
}
