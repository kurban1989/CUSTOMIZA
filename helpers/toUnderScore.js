const toUnderScore = (str) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}
export default toUnderScore
