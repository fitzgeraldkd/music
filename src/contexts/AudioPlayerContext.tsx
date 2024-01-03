import { createContext, useEffect, useState } from "react"

import { Howl } from "howler"

export type AudioPlayerStatus = "paused" | "playing" | "stopped"

interface AudioPlayerContextInterface {
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
    const [source, setSource] = useState<string | null>(null)
    const [status, setStatus] = useState<AudioPlayerStatus>("stopped")
    const [audio, setAudio] = useState<Howl | null>(null)

    useEffect(() => {
        audio?.stop()
        if (!source) setAudio(null)
        else setAudio(new Howl({
            src: source,
            html5: true,
            onend: () => setStatus("stopped"),
            onpause: () => setStatus("paused"),
            onplay: () => setStatus("playing"),
            onstop: () => setStatus("stopped"),
        }))
    }, [source])

    return (
        <AudioPlayerContext.Provider value={{ audio, setSource, source, status }}>
            {children}
        </AudioPlayerContext.Provider>
    )
}
