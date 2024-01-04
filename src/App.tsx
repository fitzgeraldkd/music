import CssBaseline from "@mui/material/CssBaseline"

import { AudioPlayerProvider } from "./contexts/AudioPlayerContext"
import Undue from "./pages/Undue"

export default function App() {
    return (
        <AudioPlayerProvider>
            <CssBaseline />
            <Undue />
        </AudioPlayerProvider>
    )
}
