<template>
  <component
    :is="link ? (isExternalLink || paginator) ? 'a' : 'nuxt-link' : 'button'"
    :type="!link ? type : false"
    :target="link && target ? target : null"
    :to="link && !isExternalLink && !paginator ? localePath(link) : null"
    :href="link && isExternalLink ? `//${domain}${localePath(link)}` : link || (link && paginator) ? localePath(link) : null"
    v-bind="$attrs"
    class="button-full"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot>
      {{ note }}
    </slot>
  </component>
</template>

<script>
export default {
  name: 'ButtonFull',
  props: {
    domain: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Array,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    link: {
      type: Object,
      required: false,
      default: null
    },
    paginator: {
      type: Boolean,
      required: false,
      default: false
    },
    isExternalLink: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    note: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      required: false,
      default: 'Button'
    },
    target: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss">
  .button-full {
    min-width: 10px;
    border: none;
    -webkit-font-smoothing: subpixel-antialiased;
    transform: translateZ(0) scale(1.0, 1.0);
    cursor: pointer;
    outline: none;

    &:disabled {
      cursor: not-allowed;
    }
  }
</style>
