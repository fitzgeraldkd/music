// The files in this bucket are not sensitive, and there is a bucket policy to only allow access to files/folders
// that should be publicly accessible (i.e. prevent users from accessing a song before its release date).
export const BUCKET_URL = "https://kenneth-music.s3.us-east-2.amazonaws.com"

interface Song {
    source: string
    subpath: string
    title: string
}

interface Collection {
    path: string
    title: string
    songs: Song[]
}

export const songCollections: Collection[] = [
    {
        title: "Songs",
        path: "/misc/",
        songs: [
            {
                source: "misc/Dawning.mp3",
                subpath: "dawning/",
                title: "Dawning",
            },
            {
                source: "misc/Traversing+the+Tunnels.mp3",
                subpath: "traversing-the-tunnels/",
                title: "Traversing the Tunnels",
            },
            {
                source: "misc/Undue.mp3",
                subpath: "undue/",
                title: "Undue",
            },
        ],
    },
]
