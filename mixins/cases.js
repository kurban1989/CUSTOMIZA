import { binary, isClient } from '~/helpers'

export default {
  mounted () {
    if (isClient) {
      const images = document.querySelectorAll('.post__body img');
      [].forEach.call(images, (img) => {
        img.addEventListener('click', this.showModal)
      })
    }
  },
  beforeDestroy () {
    if (isClient) {
      const images = document.querySelectorAll('.post__body img');
      [].forEach.call(images, (img) => {
        img.removeEventListener('click', this.showModal)
      })
    }
  },
  methods: {
    showModal (e) {
      // console.info(e)
      e.preventDefault()
      this.executeModal(e.target)
    },
    executeModal (target) {
      const h = this.$createElement
      // Using HTML string
      const titleVNode = h('div', { domProps: { innerHTML: target.alt && target.alt.length > 0 ? target.alt : this.$t('TitleImg') } })
      // More complex structure
      const messageVNode = h('div', { class: ['container--img'] }, [
        h('b-img', {
          props: {
            src: target.src,
            thumbnail: true,
            center: true,
            fluid: true
          }
        })
      ])
      // We must pass the generated VNodes as arrays
      this.$bvModal.msgBoxOk([messageVNode], {
        title: [titleVNode],
        buttonSize: 'md',
        centered: true,
        size: 'xl'
      })
    },
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
      const decoded = binary.fromBinary(this.enCode(code))
      return decoded.replace(/(src="\.\.\/)/gm, 'src="/')
    },
    setImgBlockHeight () {
      const images = document.querySelectorAll('.post__body img');
      [].forEach.call(images, (img) => {
        this.heightImages.push(img.getAttribute('height'))
      })

      if (window.matchMedia('(max-width: 640px)').matches) {
        [].forEach.call(images, (img, index) => {
          const width = img.getAttribute('width')
          if (window.innerWidth <= width) {
            img.setAttribute('height', img.width * 0.7)
          }
        })
      } else {
        [].forEach.call(images, (img, index) => {
          img.setAttribute('height', this.heightImages[index])
        })
      }
    }
  }
}
