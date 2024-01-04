import { Fragment, useState } from "react"

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
import { songCollections } from "../utils/constants"

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
                    {songCollections.map(collection => (
                        <Fragment key={collection.path}>
                            <ListItem>
                                <ListItemText primary={collection.title} primaryTypographyProps={{ variant: "subtitle1" }} />
                            </ListItem>
                            <List className="songs-list" disablePadding>
                                {collection.songs.map(song => (
                                    <ListItemButton key={song.subpath} onClick={() => navigateAndClose(collection.path + song.subpath)}>
                                        <ListItemText primary={song.title} primaryTypographyProps={{ variant: "subtitle2" }} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Fragment>
                    ))}
                </MenuList>
            </Drawer>
        </>
    )
}
