<template>
  <div v-if="isLoading" class="loading--mask">
    <div class="loading--spinner">
      <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path" /></svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoadingSpinner',
  props: {
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.loading {
  &--mask {
    position: absolute;
    z-index: 2;
    background-color: rgba(203, 255, 198, 0.8);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s;
  }
  &--spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;

    .circular {
      height: 42px;
      width: 42px;
      animation: loading-rotate 2s linear infinite;
    }

    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90,150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #409eff;
      stroke-linecap: round;
    }
  }
}
@keyframes loading-rotate {
    to {
        transform: rotate(1turn)
    }
}

@keyframes loading-dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0
    }

    50% {
        stroke-dasharray: 90,150;
        stroke-dashoffset: -40px
    }

    to {
        stroke-dasharray: 90,150;
        stroke-dashoffset: -120px
    }
}
</style>
