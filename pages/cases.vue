<template>
  <div class="container relative">
    <confirmation-dialog id="delete-confirmation-case" body="DeleteConfirmCase" @ok="remove" />
    <div class="row no-gutters header header-ed">
      <nuxt-link :to="localePath({ path: '/' })" class="logo logo-ed bg-standart-options col-3 col-md-2" />
      <div class="row col-lg-9 col-md-10 col-9 offset-lg-1 menu-group align-self-center">
        <ul class="col no-gutters flex justify-content-lg-start justify-content-end align-items-center">
          <li
            v-for="(item, index) in caseMenu"
            :key="index"
            class="link item-menu"
            :title="item.hint"
          >
            <nuxt-link :to="localePath({ path: `/${item.link}`})" class="a-link">
              {{ $t(item.title) }}
            </nuxt-link>
          </li>
        </ul>
        <div class="row col-sm-7 col-md-5 col-lg-5 col-xl-4 personal-area only-desktop">
          <log-in />
          <switcher-lang />
        </div>
      </div>
    </div>

    <hr>
    <div v-if="cases.length" class="row justify-content-between px-10">
      <div
        v-for="(item, index) of cases"
        :key="index"
        class="col-md-3 flex box f-column"
      >
        <h3>
          {{ item.short_title }}
        </h3>

        <p>
          {{ $t('Question') }}:
          <i>
            {{ item.question }}
          </i>
        </p>
        <hr>
        <p>
          <b class="box--sub-title">Автор:</b> {{ item.author }}
        </p>
        <p class="date">
          <b class="box--sub-title">{{ $t('Date of the application') }}:</b> {{ new Date(item.date_of_application).toLocaleDateString($i18n.locale, optionDate) }}
        </p>
        <p class="date">
          <b class="box--sub-title">Дата создания:</b> {{ new Date(item.date).toLocaleDateString($i18n.locale, optionDate) }}
        </p>

        <hr>
        <p class="flex justify-content-between mx-1">
          <span>Видимый на сайте:</span>&nbsp;<span :class="item.visible ? 'on' : 'off'" />
        </p>
        <br>

        <div class="flex justify-content-between mx-1">
          <b-button variant="danger" @click="onDeleteConfirm(item.id)">
            {{ $t('delete') }}
          </b-button>
          <b-button variant="success" @click="edit(item.id)">
            {{ $t('edit') }}
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SwitcherLang from '~/components/blocks/SwitcherLang'
import LogIn from '~/components/blocks/LogIn'
import caseMenu from '~/resourse/caseMenu.json'
import ConfirmationDialog from '~/components/elements/ConfirmationDialog'

export default {
  name: 'Cases',
  middleware: ['auth', 'notUser'],
  components: {
    LogIn,
    SwitcherLang,
    ConfirmationDialog
  },
  data () {
    return {
      caseMenu,
      optionDate: {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      },
      deleteCase: null
    }
  },
  computed: {
    ...mapState({
      cases: state => state.readyCase.cases
    })
  },
  beforeMount () {
    this.$store.dispatch('readyCase/getAll')
  },
  methods: {
    edit (id) {
      this.$router.push(`/case/add-edit?id=${id}`)
    },
    remove () {
      if (this.deleteCase) {
        this.$axios.get('api/cases/delete/' + this.deleteCase).then((res) => {
          this.$store.dispatch('readyCase/getAll')
        })
      }
    },
    onDeleteConfirm (id) {
      this.deleteCase = id
      this.$bvModal.show('delete-confirmation-case')
    }
  }
}
</script>
<style lang="scss">
.box {
  box-shadow: 0 1px 3px 1px rgba(0,0,0,.15);
  -webkit-transition: box-shadow .4s;
  color: #646770;
  padding: 22px 10px;
  border-radius: 3px;
  background-color: #fff;
  margin-bottom: 20px;
  margin-right: 15px;

  &:hover {
    box-shadow: 0 1px 4px 2px rgba(0,0,0,.25);
  }

  h3 {
    font-size: 16px;
    line-height: 30px;
    color: inherit;
    font-weight: bold;
  }

  &--sub-title {
    font-size: 15px;
    color: rgb(1, 18, 177);
    line-height: 20px;
  }
}
.on
{
  display:block;
  width:20px;
  height:20px;
  border-radius:25px;
  background-image: radial-gradient(white 20%,yellow 80%);
  box-shadow: 0px 0px 20px 1px rgba(235,220,7,1);
  margin-right: 20px;
}

.off
{
  display:block;
  width:20px;
  height:20px;
  border-radius:25px;
  background-image: radial-gradient(white 10%,grey 80%);
  box-shadow: 0px 0px 5px 2.5px rgba(184,183,178,1);
  margin-right: 20px;
}
</style>
