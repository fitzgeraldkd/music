interface RedistributeFrequencyDataOptions {
    analyzer: AnalyserNode
    linearData: Uint8Array
    linearFrequencyRange: number
    logarithmicData: Uint8Array
    lowestFrequency: number
    rangesPerOctave: number
}

/**
 * These values can be determined upfront prior to starting the animation loop. These values are constant, and do not
 * need to be re-evaluated each frame.
 */
export function getRedistributeFrequencyDataOptions(analyzer: AnalyserNode, linearData: Uint8Array, numberLogarithmicRanges: number): RedistributeFrequencyDataOptions {
    const lowestFrequency = 20 // The logarithmic scale needs a non-zero minimum value.
    const sampleRate = analyzer.context.sampleRate
    const rangesPerOctave = numberLogarithmicRanges / Math.log2(0.5 * sampleRate / lowestFrequency)
    const linearFrequencyRange = 0.5 * sampleRate / linearData.length
    const logarithmicData = new Uint8Array(numberLogarithmicRanges)

    return {
        analyzer,
        linearData,
        linearFrequencyRange,
        logarithmicData,
        lowestFrequency,
        rangesPerOctave,
    }
}

/**
 * Redistribute frequency data from getByteFrequencyData so that the frequency ranges are distributed logarithmically
 * instead of linearly. This function is called every frame, so keep the logic as minimal as possible.
 */
export function redistributeFrequencyData({ analyzer, linearData, linearFrequencyRange, logarithmicData, lowestFrequency, rangesPerOctave }: RedistributeFrequencyDataOptions) {
    analyzer.getByteFrequencyData(linearData)
    let frequency = lowestFrequency
    logarithmicData.forEach((_, index, data) => {
        const nextFrequency = frequency * 2 ** (1 / rangesPerOctave)

        // TODO: Use these float indeces to reduce the weight of the first and last value of the subset if the length
        // is greater than 1.
        const linearStartIndex = frequency / linearFrequencyRange
        const linearEndIndex = nextFrequency / linearFrequencyRange
        const linearDataSubset = linearData.slice(Math.floor(linearStartIndex), Math.ceil(linearEndIndex))

        frequency = nextFrequency
        data[index] = Math.round(linearDataSubset.reduce((a, b) => a + b, 0) / linearDataSubset.length)
    })

    return logarithmicData
}
