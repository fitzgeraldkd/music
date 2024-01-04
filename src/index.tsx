import React from "react"

import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import "./index.css"
import App from "./App"
import Song from "./pages/Song"
import reportWebVitals from "./reportWebVitals"
import { songCollections } from "./utils/constants"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Song />,
            },
            ...songCollections.map(collection => ({
                path: collection.path,
                children: collection.songs.map(song => ({
                    path: song.subpath,
                    element: <Song audioPath={song.source} title={song.title} />,
                })),
            })),
        ],
    },
])

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
)
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
