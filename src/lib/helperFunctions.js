export const padString = (str, size = 3) => {
  // debugger
  str = str.toString()
  // always move the negative to the edge:
  if (str[0] === '-' && str.length < size) {
    const strCut = str.slice(1, str.length)
    return padString('-0' + strCut, size)
  }
  return str.length < size ? padString('0' + str, size) : str
}
