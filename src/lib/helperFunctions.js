export const padString = (str, size = 3) => {
  str = str.toString()
  return str.length < size ? padString('0' + str, size) : str
}
