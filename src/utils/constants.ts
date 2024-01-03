// The files in this bucket are not sensitive, and there is a bucket policy to only allow access to files/folders
// that should be publicly accessible (i.e. prevent users from accessing a song before its release date).
// For development, read from the local public directory to allow the audio player and analyzer to work properly.
export const BUCKET_URL = (
    process.env.NODE_ENV === "production"
        ? "https://kenneth-music.s3.us-east-2.amazonaws.com"
        : `${process.env.PUBLIC_URL}/music`
)
