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
        const eq = this.capture ? 1 : this.rent ? 2 : 0
        let questions = false

        Object.keys(data).forEach((item) => {
          const $input = document.querySelectorAll(`div[data-type="${item}"]`)
          let ccontinue = false

          if (item === 'file' || item === 'errors' || item === 'withoutTextArea') {
            ccontinue = true
          }

          if ((item === 'withoutTextArea' && data[item]) || (data.withoutTextArea && item === 'question')) {
            ccontinue = true
            questions = true
          }

          try {
            if ((data[item] === '' || !data[item] || (item === 'phone' && data[item].length < 18)) && !ccontinue) {
              data.errors = true
              $input[eq].classList.add('error-input')
            } else {
              $input[eq].classList.remove('error-input')
            }
          } catch (e) {}
        })

        delete data.withoutTextArea

        if (questions) {
          data.programms = this.requestRentProgramm
          if (Array.isArray(this.requestRentProgramm) && this.requestRentProgramm.length === 0) {
            this.loading = false
            this.$store.dispatch('statusForm/setMessageErrorBadRequest', 'noProgram')
            this.$bvModal.show('bv-modal-error')
            return false
          } else {
            this.$store.dispatch('statusForm/clearMessageError')
          }
        }

        if (data.errors) {
          this.loading = false
          this.$bvModal.show('bv-modal-error')
          data.errors = false
          return false
        }
        this.sendFormData(data, questions)
      }
    },
    sendFormData (data, rent = false) {
      request({ url: rent ? 'rent' : 'yandex', body: data }).then((responce) => {
        this.loading = false
        if (responce && responce.status === 200) {
          this.$store.dispatch('statusForm/clearForm')
          this.$bvModal.show('bv-modal-success')

          setTimeout(() => {
            this.$store.dispatch('statusForm/resetClear')
          }, 90)

          if (this.programs && Array.isArray(this.programs) && this.programs[0].name) {
            this.programs = this.programs.map((v) => {
              return {
                name: v.name,
                checked: false
              }
            })
          }
        } else {
          this.$store.dispatch('statusForm/setMessageErrorBadRequest')
          this.$bvModal.show('bv-modal-error')
        }
      })
    }
  }
}
