import { type CSSObject } from "@mui/material/styles"

const AudioPlayerStyles: CSSObject = {
    "alignItems": "center",
    "backgroundColor": "#FFFFFF18",
    "borderRadius": 100,
    "bottom": 16,
    "color": "#FF0000",
    "display": "flex",
    "gap": 16,
    "left": "50%",
    "maxWidth": 500,
    "padding": 12,
    "position": "absolute",
    "transform": "translateX(-50%)",
    "width": "calc(100% - 32px)",
    "& > .audio-metadata": {
        flexGrow: 1,
    },
}

export default AudioPlayerStyles
