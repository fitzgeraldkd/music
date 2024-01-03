import { createContext, useEffect, useState } from "react"

import { Howl, Howler } from "howler"

export type AudioPlayerStatus = "paused" | "playing" | "stopped"

interface AudioPlayerContextInterface {
    analyzer: AnalyserNode | null
    audio: Howl | null
    source: string | null
    setSource: React.Dispatch<React.SetStateAction<string | null>>
    status: AudioPlayerStatus
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

    useEffect(() => {
        audio?.stop()
        if (!source) setAudio(null)
        else setAudio(new Howl({
            src: source,
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
        <AudioPlayerContext.Provider value={{ analyzer, audio, setSource, source, status }}>
            {children}
        </AudioPlayerContext.Provider>
    )
}
