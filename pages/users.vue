<template>
  <div class="relative">
    <mobile-menu :menu-list="list" />
    <header-site :slotHead="true" :header="$t('Users')">
      <div class="container-fluid pr-4">
        <b-table
          hover
          :fields="fields"
          :items="items"
          :busy="loading"
          class="mt-3"
          outlined>
          <template v-slot:table-busy>
            <div class="text-center text-success my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>
          <template v-slot:cell(firstName)="data">
            {{ data.item.lastName }} {{ data.item.firstName }}
          </template>
          <template v-slot:cell(roleName)="data">
            {{ $t(data.item.roleName) }}
          </template>
          <template v-slot:cell(statusName)="data">
            {{ $t(data.item.statusName) }}
          </template>
        </b-table>
      </div>
    </header-site>
    <footer-site />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { required, minLength } from 'vuelidate/lib/validators'
// eslint-disable-next-line no-unused-vars
import { request } from '~/helpers'
// import BaseInput from '~/components/elements/BaseInput'
// import PrimaryButton from '~/components/elements/PrimaryButton'
import HeaderSite from '~/components/HeaderSite'
import FooterSite from '~/components/FooterSite'
import MobileMenu from '~/components/menus/MobileMenu'
import mainMenu from '~/resourse/mainMenu.json'

export default {
  components: {
    HeaderSite,
    FooterSite,
    MobileMenu
    // PrimaryButton,
    // BaseInput,
  },
  data () {
    return {
      list: mainMenu,
      fields: [
        { key: 'firstName', label: `${this.$t('Surname')}, ${this.$t('Name')}` },
        { key: 'phone', label: this.$t('Phone') },
        { key: 'email', label: 'E-mail' },
        { key: 'roleName', label: this.$t('RoleUser') },
        { key: 'statusName', label: this.$t('StatusUser') }
      ],
      items: [],
      loading: false
    }
  },
  mounted () {
    this.loading = true
    this.$axios.get('/api/users/get').then((res) => {
      this.items = res.data.users
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
  }
}
</script>
