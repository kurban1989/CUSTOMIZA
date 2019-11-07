<template>
  <div class="wrapper relative">
    <div v-lazy:background-image="'/2447944.png'" class="bgi relative">
      <section class="container relative">
        <form-area
          id="captureForm"
          :header="$t('Leave a request for a free consultation for questions related to 1C!')"
          input-class="transparent"
          style-form="form-transparent"
          style-header="header-white"
          :checkbox-right="true"
        />
      </section>
    </div>
  </div>
</template>

<script>
import FormArea from '~/components/elements/FormArea'

export default {
  name: 'CaptureForm',
  components: {
    FormArea
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100vw;
  height: 850px;
  background: rgb(155,197,104);
  background: -moz-linear-gradient(-45deg, rgba(155,197,104,1) 0%, rgba(107,150,56,1) 43%);
  background: -webkit-linear-gradient(-45deg, rgba(155,197,104,1) 0%, rgba(107,150,56,1) 43%);
  background: linear-gradient(-45deg, rgba(155,197,104,1) 0%, rgba(107,150,56,1) 43%);
  overflow: visible;
  margin-bottom: 116px;
  &:before {
    content: '';
    position: absolute;
    top: -60px;
    right: 0;
    width: 98%;
    height: 910px;
    background: {
      image: url('/2447944.svg');
      repeat: no-repeat;
      position: bottom right;
      size: cover;
    }
  }
}
.bgi {
  width: 100%;
  height: 910px;
  top: -60px;
  left: 0;
  padding-top: 140px;
  background: {
    repeat: no-repeat;
    position: bottom 0 right 5%;
    // size: 46% 107%;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: -130px;
    right: 4.5%;
    width: 330px;
    height: 380px;
    background: {
      image: url('~assets/body/green-coube.svg');
      repeat: no-repeat;
      position: center;
      size: contain;
    }
    transform: rotate(6deg);
  }
}
/deep/ .placeholder {
  color: rgba(255, 255, 255, 0.5);
}
/deep/ .form-transparent {
  width: 752px;
}
/deep/ textarea {
  min-height: 180px;
}
/deep/ .input-wrap {
  width: 574px;
}
/deep/ .primary {
  margin-top: 30px;
  margin-right: 30px;
  .btn-text {
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.31);
  }
}
@media (max-width: 1441px) {
  .bgi {
    background-position: bottom 0 right -10px;
  }
}

@media (max-width: 1200px) {
  .wrapper {
    &:before {
      content: '';
      background-position: bottom right -220px;
    }
  }
  .bgi {
    background-position: bottom 0 right -375px;
    background-size: auto;
    &:after {
      right: -10%;
    }
  }
}
@media (max-width: 991px) {
  .bgi {
    background-position: bottom 0 right -520px;
    &:after {
      right: -17%;
    }
  }
  .container {
    z-index: 1;
  }
  /deep/ .header-white {
    width: 574px;
  }
}
@media (max-width: 768px) {
  .wrapper {
    height: fit-content;
    padding-bottom: 20px;
    margin-bottom: 30px;
    &:before {
      width: 100%;
      height: 110%;
      top: auto;
      left: 0;
      bottom: 0;
      pointer-events: none;
    }
  }
  .bgi {
    top: 0;
    background-image: unset !important;
    padding-top: 20px;
    height: fit-content;
    &:after {
      content: none;
    }
  }
  /deep/ .form-transparent, /deep/ .header-white {
    width: 100%;
  }
  /deep/ .header-white {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  /deep/ .input-wrap.transparent {
    border-width: 2px;
  }
  /deep/ .primary {
    width: 100%;
    max-width: 400px;
    margin-top: 10px;
    margin-right: 0;
  }
}
</style>
