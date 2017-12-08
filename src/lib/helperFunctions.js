/**
 * Pads a string with 0s to force it to be a certain size
 *
 * @export
 * @param {string} str - The string to add padding to
 * @param {number} size - The number of characters to have total
 * @returns {string} - the padded string
 */
export const padString = (str, size = 3) => {
  str = str.toString()
  // always move the negative to the edge:
  if (str[0] === '-' && str.length < size) {
    const strCut = str.slice(1, str.length)
    return padString('-0' + strCut, size)
  }
  return str.length < size ? padString('0' + str, size) : str
}
