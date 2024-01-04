import { useEffect } from "react"

export default function useTitle(title = "Kenneth") {
    useEffect(() => {
        document.title = title
    }, [title])
}
