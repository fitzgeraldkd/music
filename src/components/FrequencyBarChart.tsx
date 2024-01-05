import { useContext, useEffect, useRef, useState } from "react"

import { darken } from "@mui/material/styles"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { Mesh } from "three"

import { AudioPlayerContext } from "../contexts/AudioPlayerContext"

const FREQUENCY_BAND_COUNT = 32
const FREQUENCY_BAR_GAP = 0
const FREQUENCY_BAR_MAX_HEIGHT = 100
const FREQUENCY_BAR_SIZE = 1
const SLICE_COUNT = 25

/**
 * A 3D frequency bar chart visualizer.
 * TODO: The frequency bands in the data are spaced linearly. It may provide a better visualization to make this exponential.
 */
export default function FrequencyBarChart() {
    const { analyzer } = useContext(AudioPlayerContext)
    const gridRef = useRef<(Mesh | null)[][]>([...Array(SLICE_COUNT)].map(_ => Array(FREQUENCY_BAND_COUNT).fill(null)))
    const [dataArray, setDataArray] = useState<Uint8Array>()

    useEffect(() => {
        if (analyzer) {
            analyzer.fftSize = FREQUENCY_BAND_COUNT * 2
            setDataArray(new Uint8Array(analyzer.frequencyBinCount))
        }
    }, [analyzer])

    useThree(state => state.camera.lookAt(0, FREQUENCY_BAR_MAX_HEIGHT / 2, 0))

    useFrame(() => {
        if (!analyzer || !dataArray) return

        // The slices behind the front slice can simply copy the data from the slice in front of it, to avoid
        // re-calculating these values.
        for (let sliceIndex = 0; sliceIndex < SLICE_COUNT - 1; sliceIndex++) {
            gridRef.current[sliceIndex].map((box, boxIndex) => {
                const neighborBox = gridRef.current[sliceIndex + 1][boxIndex]
                if (box && neighborBox) {
                    box.scale.y = neighborBox.scale.y
                    box.position.y = neighborBox.position.y
                }
            })
        }

        // The slice in front is the only one that gets brand new data.
        analyzer.getByteFrequencyData(dataArray)
        gridRef.current[SLICE_COUNT - 1].map((box, boxIndex) => {
            if (box) {
                const height = FREQUENCY_BAR_MAX_HEIGHT * dataArray[boxIndex] / 255
                box.scale.y = height
                box.position.y = height / 2
            }
        })
    })

    return (
        <>
            <ambientLight />
            <pointLight intensity={500000} position={[20, FREQUENCY_BAR_MAX_HEIGHT * 1.5, 300]} />
            <OrbitControls enableDamping enablePan enableRotate enableZoom />
            <PerspectiveCamera makeDefault position={[100, FREQUENCY_BAR_MAX_HEIGHT / 2, 100]} />
            <group position={[0, -0.5 * FREQUENCY_BAR_MAX_HEIGHT, 0]}>
                {gridRef.current.map((slice, sliceIndex) => (
                    <group key={sliceIndex} position={[0, 0, (sliceIndex - SLICE_COUNT) * FREQUENCY_BAR_SIZE]}>
                        {slice.map((_, index) => (
                            <mesh
                                ref={ref => gridRef.current[sliceIndex][index] = ref}
                                key={index}
                                position={[
                                    (index - (FREQUENCY_BAND_COUNT / 2)) * (FREQUENCY_BAR_GAP + FREQUENCY_BAR_SIZE),
                                    0,
                                    0,
                                ]}
                                scale={[FREQUENCY_BAR_SIZE, 0, FREQUENCY_BAR_SIZE]}
                            >
                                <boxGeometry args={[1, 1, 1]} />
                                <meshStandardMaterial color={darken("#FF0000", 1 - (sliceIndex / (SLICE_COUNT - 1)))} />
                            </mesh>
                        ))}
                    </group>
                ))}
            </group>
        </>
    )
}
