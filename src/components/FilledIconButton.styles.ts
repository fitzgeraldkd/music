import { type CSSObject } from "@mui/material/styles"

import { FilledIconButtonProps } from "./FilledIconButton"

const FilledIconButtonStyles = ({ backgroundColor, textColor }: FilledIconButtonProps): CSSObject => ({
    "backgroundColor": backgroundColor,
    "color": textColor,
    "&:hover": {
        backgroundColor: backgroundColor,
    },
})

export default FilledIconButtonStyles
