<template>
  <div class="relative">
    <confirmation-dialog id="delete-confirmation" body="DeleteConfirmUser" @ok="onDelete"></confirmation-dialog>
    <mobile-menu :menu-list="list" />
    <header-site :slotHead="true" header="">
      <div class="container-fluid pr-4">
        <h1 class="h1">
          {{ $t('Users') }}
        </h1>
        <b-row>
          <b-col lg="6">
            <b-button variant="primary">{{ $t('NewUser') }}</b-button>
          </b-col>
          <b-col lg="6">
            <b-form-group
              :label="$t('SearchUser')+':'"
              label-cols-sm="5"
              label-align-sm="right"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group>
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  :placeholder="$t('Search')"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">{{$t('clear')}}</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table
          hover
          :fields="fields"
          :items="users"
          :busy="loading"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          class="mt-3"
          head-variant="light"
          table-variant="light"
          outlined
          @filtered="onFiltered">
          <template v-slot:table-busy>
            <div class="text-center text-success my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>
          <template v-slot:cell(lastName)="data">
            {{ data.item.lastName }} {{ data.item.firstName }}
          </template>
          <template v-slot:cell(roleName)="data">
            <b-form-select size="sm" v-model="data.item.roleId" @change="changeUser(data.item)">
              <b-form-select-option v-for="(role, index) in roles" :key="index" :value="role.id">{{ $t(role.name) }}</b-form-select-option>
            </b-form-select>
          </template>
          <template v-slot:cell(statusName)="data">
            <b-form-select size="sm" v-model="data.item.statusId" @change="changeUser(data.item)">
              <b-form-select-option v-for="(status, index) in statuses" :key="index" :value="status.id">{{ $t(status.name) }}</b-form-select-option>
            </b-form-select>
          </template>
          <template v-slot:cell(Actions)="data">
            <div class="row justify-content-end m-0">
              <b-button variant="success" size="sm">{{ $t('edit') }}</b-button>
              <b-button class="ml-2" variant="danger" size="sm" @click="onDeleteConfirm(data.item.id)">{{ $t('delete') }}</b-button>
            </div>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          page-class="success"
        ></b-pagination>
      </div>
    </header-site>
    <footer-site />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderSite from '~/components/HeaderSite'
import FooterSite from '~/components/FooterSite'
import MobileMenu from '~/components/menus/MobileMenu'
import mainMenu from '~/resourse/mainMenu.json'
import ConfirmationDialog from '~/components/elements/ConfirmationDialog'

export default {
  middleware: ['auth', 'admin'],
  components: {
    HeaderSite,
    FooterSite,
    MobileMenu,
    ConfirmationDialog
  },
  computed: {
    ...mapGetters({
      loading: 'users/loading',
      users: 'users/users',
      statuses: 'users/statuses',
      roles: 'users/roles'
    })
  },
  data () {
    return {
      list: mainMenu,
      fields: [
        { key: 'lastName', label: `${this.$t('Surname')}, ${this.$t('Name')}`, sortable: true },
        { key: 'phone', label: this.$t('Phone') },
        { key: 'email', label: 'E-mail' },
        { key: 'roleName', label: this.$t('RoleUser') },
        { key: 'statusName', label: this.$t('StatusUser') },
        { key: 'Actions', label: '' }
      ],
      filter: '',
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      deleteUserId: null
    }
  },
  watch: {
    users: {
      handler () {
      },
      immediate: false
    }
  },
  mounted () {
    this.$store.dispatch('users/getRoles')
    this.$store.dispatch('users/getStatuses')
    // eslint-disable-next-line no-return-assign
    this.$store.dispatch('users/getUsers').then(res => this.totalRows = res.data.length)
  },
  methods: {
    changeUser (user) {
      console.log(user)
      this.$store.dispatch('users/saveUser', user)
    },
    onDelete () {
      this.$store.dispatch('users/deleteUser', this.deleteUserId)
    },
    onDeleteConfirm (id) {
      this.deleteUserId = id
      this.$bvModal.show('delete-confirmation')
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
