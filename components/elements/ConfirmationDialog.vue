<template>
  <b-modal
    :id="id"
    :title="$t(title)"
    @ok="$emit('ok')"
    @cancel="$emit('cancel')"
    @hidden="$emit('hidden')"
  >
    <p class="note note-error">
      {{ $t(body) }}
    </p>
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button variant="warning" @click="cancel()">
        {{ $t('Cancel') }}
      </b-button>
      <b-button variant="success" @click="ok()">
        {{ $t('OK') }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'ConfirmationDialog',
  props: {
    id: {
      type: String,
      required: false,
      default: 'confirmation-dialog'
    },
    title: {
      type: String,
      required: false,
      default: 'sm'
    },
    body: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>
