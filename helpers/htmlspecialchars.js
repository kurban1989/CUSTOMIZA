const htmlspecialchars = {
  encode: (string) => {
    const mapChars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '&quot': '&#34;',
      '–': '&ndash;',
      '—': '&mdash;',
      "'": '&#39;'
    }
    const repl = (c) => { return mapChars[c] }
    return string.replace(/[&<>'"]/g, repl)
  },
  decode: (str) => {
    const mapChars = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&ndash;': '–',
      '&mdash;': '—',
      '&#039;': "'"
    }
    return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#039;|&ndash;|&mdash;)/gm, (m) => { return mapChars[m] })
  }
}
export default htmlspecialchars
