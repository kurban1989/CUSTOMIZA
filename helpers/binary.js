const binary = {
  toBinary: (string) => {
    const codeUnits = new Uint16Array(string.length)
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i)
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer))
  },
  fromBinary: (binary) => {
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer))
  }
}

export default binary
