import CssBaseline from "@mui/material/CssBaseline"
import { Outlet } from "react-router-dom"

import Menu from "./components/Menu"
import { AudioPlayerProvider } from "./contexts/AudioPlayerContext"

export default function App() {
    return (
        <AudioPlayerProvider>
            <CssBaseline />
            <Menu />
            <Outlet />
        </AudioPlayerProvider>
    )
}
