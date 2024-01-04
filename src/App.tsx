import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { Outlet } from "react-router-dom"

import Menu from "./components/Menu"
import { AudioPlayerProvider } from "./contexts/AudioPlayerContext"
import { theme } from "./utils/theme"

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <AudioPlayerProvider>
                <CssBaseline />
                <Menu />
                <Outlet />
            </AudioPlayerProvider>
        </ThemeProvider>
    )
}
