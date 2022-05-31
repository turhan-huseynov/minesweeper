/**
 * Creates array of given length filled with unique numbers between [0, interval]
 */
export function generateArrayOfUniqueNumbers(options) {
    let { size = 0, interval = 0 } = options || {};
    const arr = [];
    let count = 0;
    if (size > interval) {
        // interval is too short
        console.debug("interval is too short - please enter a bigger interval");
        return arr;
    }
    while (arr.length < size) {
        // TODO: improve implementation to get rid of this check
        if (count > size * 10) {
            // interval is too short
            console.debug(
                "it took too long to find a unique number since interval is too short - please enter a bigger interval"
            );
            return arr;
        }
        let randomNum = Math.floor(Math.random() * (interval + 1));
        // if given number not created
        if (arr.indexOf(randomNum) === -1) {
            arr.push(randomNum);
        }
        count++;
    }
    return arr;
}
