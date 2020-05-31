<template>
  <div class="post__comment-warp">
    <div class="post__comment">
      <div class="post__comment--user">
        <svg-user class="default-image" />
        <span class="post__comment--nickname_comment">
          {{ list.user }}
        </span>

        <time class="post__comment--date-time" :datetime="new Date(list.updated_at).toLocaleDateString($i18n.locale, optionDate)">
          {{ new Date(list.updated_at).toLocaleDateString($i18n.locale, optionDate) }}
        </time>
      </div>

      <div class="post__comment--rating">
        <button-full
          v-if="user.id !== list.id_user"
          :disabled="!isLoggined"
          :title="isLoggined ? '' : `${$t('rateOnlyRegUsers')}`"
          :note="''"
          @click="rate(list.id, list.rate, false)"
        >
          <svg-arrow class="post__comment--rating-up arrow" />
        </button-full>

        <span :id="`rate${list.id}`" class="post__comment--rating-counter" :class="{minus: list.rate < 0 || (nowRate && nowRate < 0)}">
          {{ nowRate || list.rate }}
        </span>

        <button-full
          v-if="user.id !== list.id_user"
          :disabled="!isLoggined"
          :title="isLoggined ? '' : `${$t('rateOnlyRegUsers')}`"
          :note="''"
          @click="rate(list.id, list.rate, true)"
        >
          <svg-arrow class="arrow" />
        </button-full>
      </div>
    </div>
    <div class="post__comment--body mb-2">
      {{ list.comment | htmldecode }}
    </div>
    <div v-if="(!isEmpty(user) && user.roleId === 1) || (!isEmpty(user) && user.id === list.id_user)" class="row w-100">
      <b-button class="ml-auto justify-self-end" variant="danger" size="sm" @click="onDeleteConfirm(list.id)">
        {{ $t('delete') }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SvgUser from '~/components/elements/svg/SvgUser.vue'
import SvgArrow from '~/components/elements/svg/SvgArrow.vue'
import ButtonFull from '~/components/elements/ButtonFull'
import { isEmpty } from '~/helpers'

export default {
  name: 'ListComments',
  components: {
    ButtonFull,
    SvgArrow,
    SvgUser
  },
  props: {
    list: {
      type: Object,
      required: true
    },
    isLoggined: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      nowRate: null,
      optionDate: {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user || {}
    })
  },
  methods: {
    isEmpty,
    async rate (id, rate, up) {
      rate = up ? Number(rate) + 1 : rate - 1
      this.nowRate = rate
      await this.$axios.post(`${process.env.baseUrl}/api/comments/update-rate`, {
        idComment: id,
        rateId: rate
      })
    },
    onDeleteConfirm (id) {
      if (this.isEmpty(this.user)) {
        return false
      }

      this.$emit('on-delete', id)
      this.$bvModal.show('delete-confirmation-comment')
    }
  }
}
</script>
