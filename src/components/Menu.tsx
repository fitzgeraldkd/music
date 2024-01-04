import { useState } from "react"

import QueueMusicIcon from "@mui/icons-material/QueueMusic"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { styled } from "@mui/material/styles"
import { type To, useNavigate } from "react-router-dom"

import { MenuIconButtonStyles, MenuListStyles } from "./Menu.styles"

const MenuIconButton = styled(IconButton)(MenuIconButtonStyles)
const MenuList = styled(List)(MenuListStyles)

export default function Menu() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const navigateAndClose = (to: To) => {
        setOpen(false)
        navigate(to)
    }

    return (
        <>
            <MenuIconButton onClick={() => setOpen(true)}><QueueMusicIcon /></MenuIconButton>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <MenuList disablePadding>
                    <ListItem>
                        <ListItemText primary="Miscellaneous Songs" primaryTypographyProps={{ variant: "subtitle1" }} />
                    </ListItem>
                    <List className="songs-list" disablePadding>
                        <ListItemButton onClick={() => navigateAndClose("/traversing-the-tunnels/")}>
                            <ListItemText primary="Traversing the Tunnels" primaryTypographyProps={{ variant: "subtitle2" }} />
                        </ListItemButton>
                        <ListItemButton onClick={() => navigateAndClose("/undue/")}>
                            <ListItemText primary="Undue" primaryTypographyProps={{ variant: "subtitle2" }} />
                        </ListItemButton>
                    </List>
                </MenuList>
            </Drawer>
        </>
    )
}
