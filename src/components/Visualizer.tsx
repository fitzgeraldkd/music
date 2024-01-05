import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import { Canvas } from "@react-three/fiber"

import FrequencyBarChart from "./FrequencyBarChart"
import { VisualizerBoxStyles } from "./Visualizer.styles"

const VisualizerBox = styled(Box)(VisualizerBoxStyles)

/**
 * The base canvas to wrap around the visualizers.
 * TODO: Allow the children of Canvas to be swapped out once other visualizers have been created.
 */
export default function Visualizer() {
    return (
        <VisualizerBox>
            <Canvas>
                <FrequencyBarChart />
            </Canvas>
        </VisualizerBox>
    )
}
