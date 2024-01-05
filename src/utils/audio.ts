/**
 * Redistribute frequency data from getByteFrequencyData so that the frequency ranges are distributed logarithmically
 * instead of linearly.
 */
export function redistributeFrequencyData(linearData: Uint8Array, sampleRate: number, numberLogarithmicRanges: number) {
    const lowestFrequency = 20 // The logarithmic scale needs a non-zero minimum value.
    const rangesPerOctave = numberLogarithmicRanges / Math.log2(0.5 * sampleRate / lowestFrequency)
    const linearFrequencyRange = 0.5 * sampleRate / linearData.length

    let frequency = lowestFrequency
    const logarithmicData = new Uint8Array(numberLogarithmicRanges).map(() => {
        const nextFrequency = frequency * 2 ** (1 / rangesPerOctave)

        // TODO: Use these float indeces to reduce the weight of the first and last value of the subset if the length
        // is greater than 1.
        const linearStartIndex = frequency / linearFrequencyRange
        const linearEndIndex = nextFrequency / linearFrequencyRange
        const linearDataSubset = linearData.slice(Math.floor(linearStartIndex), Math.ceil(linearEndIndex))

        frequency = nextFrequency
        return Math.round(linearDataSubset.reduce((a, b) => a + b, 0) / linearDataSubset.length)
    })

    return logarithmicData
}
