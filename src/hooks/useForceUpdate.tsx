import { useReducer } from "react"

/**
 * Use this as the callback in requestAnimationFrame to force a component/hook to rerender.
 */
export default function useForceUpdate() {
    const [_, forceUpdate] = useReducer(x => x + 1, 0)

    return forceUpdate
}
