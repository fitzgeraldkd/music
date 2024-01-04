export const AUDIO_FILE_PATHS = {
    misc: {
        traversingTheTunnels: "misc/Traversing+the+Tunnels.mp3",
        undue: "misc/Undue.mp3",
    },
}

// The files in this bucket are not sensitive, and there is a bucket policy to only allow access to files/folders
// that should be publicly accessible (i.e. prevent users from accessing a song before its release date).
export const BUCKET_URL = "https://kenneth-music.s3.us-east-2.amazonaws.com"
