import { useContext } from "react"

import DownloadIcon from "@mui/icons-material/Download"
import PauseRoundedIcon from "@mui/icons-material/PauseRounded"
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"

import AudioPlayerStyles from "./AudioPlayer.styles"
import FilledIconButton from "./FilledIconButton"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"

const AudioPlayerBox = styled(Box)(AudioPlayerStyles)

export default function AudioPlayer() {
    const { audio, source, status, title } = useContext(AudioPlayerContext)

    const disabled = !audio
    const isPlaying = status === "playing"

    return (
        <AudioPlayerBox>
            <FilledIconButton backgroundColor="white" textColor="#000000" disabled={disabled} onClick={() => isPlaying ? audio?.pause() : audio?.play()}>
                {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
            </FilledIconButton>
            <Box className="audio-metadata" component="div">
                <Typography variant="subtitle2">{title}</Typography>
                <Typography variant="body2">{title ? "by Kenneth" : null}</Typography>
            </Box>
            <IconButton href={source || ""} download={source?.split("/").reverse()[0]} disabled={disabled} sx={{ color: "white" }}>
                <DownloadIcon />
            </IconButton>
        </AudioPlayerBox>
    )
}
