export const twoDigits = (number) => {
  return number > 9 ? String(number) : '0' + number
}
export const notNullandUndefined = (val) => {
  return val !== null && val !== undefined
}
