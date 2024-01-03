import { AudioPlayerProvider } from "./contexts/AudioPlayerContext"
import Undue from "./pages/Undue"

export default function App() {
    return (
        <AudioPlayerProvider>
            <Undue />
        </AudioPlayerProvider>
    )
}
