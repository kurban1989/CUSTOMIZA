import { request } from '~/helpers'
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handlerForm (data) {
      this.loading = true
      this.$store.dispatch('statusForm/clearMessageError')

      if (data && typeof data === 'object') {
        const eq = this.capture ? 1 : 0
        let questions = false

        Object.keys(data).forEach((item) => {
          const $input = document.querySelectorAll(`div[data-type="${item}"]`)

          if (item === 'withoutTextArea' && data[item]) {
            questions = true
          }

          if (item === 'file' || item === 'errors' || questions || item === 'withoutTextArea') {
            return
          }

          if (data[item] === '' || !data[item] || (item === 'phone' && data[item].length < 18)) {
            data.errors = true
            $input[eq].classList.add('error-input')
          } else {
            $input[eq].classList.remove('error-input')
          }
        })

        if (data.errors) {
          this.loading = false
          this.$bvModal.show('bv-modal-error')
          return false
        }

        this.sendFormData(data)
      }
    },
    sendFormData (data) {
      delete data.withoutTextArea

      request({ url: 'yandex', body: data }).then((responce) => {
        this.loading = false
        if (responce && responce.status === 200) {
          this.$store.dispatch('statusForm/clearForm')
          this.$bvModal.show('bv-modal-success')

          setTimeout(() => {
            this.$store.dispatch('statusForm/resetClear')
          }, 100)
        } else {
          this.$store.dispatch('statusForm/setMessageErrorBadRequest')
          this.$bvModal.show('bv-modal-error')
        }
      })
    }
  }
}
