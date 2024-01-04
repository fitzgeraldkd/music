import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import { styled } from "@mui/material/styles"

import FilledIconButtonStyles from "./FilledIconButton.styles"

export interface FilledIconButtonProps extends IconButtonProps {
    backgroundColor: string
    textColor: string
}

const FilledIconButton = styled(
    IconButton,
    { shouldForwardProp: propName => !(["backgroundColor", "textColor"] as PropertyKey[]).includes(propName) },
)(FilledIconButtonStyles)

export default FilledIconButton
