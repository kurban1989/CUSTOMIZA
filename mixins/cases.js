import { binary } from '~/helpers'

export default {
  methods: {
    enCode (b64Encoded) {
      try {
        return atob(b64Encoded)
      } catch (e) {
        return Buffer.from(b64Encoded, 'base64').toString()
      }
    },
    deCode (code, sliceEnd = 400) {
      const formatText = binary.fromBinary(this.enCode(code))
        .replace(/(<p(.*?)>(.*?)<img\s(.*?)src(.*)>(.*?)<\/p>)/gm, '')
        .replace(/(&nbsp;)/gm, ' ')
        .replace(/(<(\/?[^>]+)>)/gm, '')
      return `${formatText.slice(0, sliceEnd)} ...`
    },
    deCodeFull (code) {
      return binary.fromBinary(this.enCode(code))
    }
  }
}
