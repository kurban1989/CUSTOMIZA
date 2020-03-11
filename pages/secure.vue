<template>
  <div class="relative">
    Тестовая страница
    <b-modal id="bv-modal-error" :title="$t('sm')" ok-only>
      <p class="note note-error">
        <template v-if="otherMessageError">
          {{ $t(messageError) }}
        </template>
        <template v-else>
          {{ $t('checkForm') }}
        </template>
      </p>
    </b-modal>

    <b-modal id="bv-modal-success" :title="$t('sm')" ok-only>
      <p class="note note-success">
        &nbsp;{{ $t('successForm') }}
      </p>
    </b-modal>

    <mobile-menu :menu-list="list" />
    <header-site />
<!--    <the-blog />-->
    <rent-block />
    <footer-site />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BModal } from 'bootstrap-vue'
import HeaderSite from '~/components/HeaderSite'
// import TheBlog from '~/components/main/TheBlog'
import RentBlock from '~/components/main/RentBlock'
import FooterSite from '~/components/FooterSite'
import MobileMenu from '~/components/menus/MobileMenu'
import mainMenu from '~/resourse/mainMenu.json'

export default {
  middleware: 'auth',
  components: {
    'b-modal': BModal,
    HeaderSite,
    FooterSite,
    MobileMenu,
    RentBlock
    // TheBlog
  },
  data () {
    return {
      list: mainMenu
    }
  },
  computed: {
    ...mapState({
      otherMessageError: state => state.statusForm.messageErrorBadRequest,
      messageError: state => state.statusForm.messageError
    })
  }
}
</script>
