<template>
  <div class="container wrapper relative">
    <div id="nav_consultation" class="row">
      <form-area
        id="headerForm"
        :header="$t('Leave a request for a free consultation for questions related to 1C!')"
        :is-load-file="true"
        :loading="loading"
        @send-form="handlerForm"
      />
    </div>
    <div class="circle bg-standart-options" />
    <div class="notebook" />
    <div class="lines bg-standart-options" />
  </div>
</template>
<script>
import FormArea from '~/components/elements/FormArea'
import checkFormAndSend from '~/mixins/checkFormAndSend'

export default {
  name: 'FooterHead',
  components: {
    FormArea
  },
  mixins: [checkFormAndSend]
}
</script>
<style lang="scss" scoped>
.row {
  margin-top: 70px;
}
.wrapper {
  bottom: 0;
  z-index: 2;
  overflow: visible;
}
.notebook {
  width: 780px;
  height: 120%;
  position: absolute;
  background-image: url('~assets/header/notebook.webp');
  background-repeat: no-repeat;
  background-position: 0 5px;
  background-size: contain;
  transform: rotate(6deg);
  top: 45px;
  right: -80px;
  z-index: -1;
}
.circle {
  width: 270px;
  height: 270px;
  position: absolute;
  bottom: 30px;
  left: -150px;
  background-image: url('~assets/header/circle.svg');
  z-index: -1;
}
.lines {
  width: 1000px;
  height: 400px;
  position: absolute;
  bottom: -300px;
  left: -490px;
  background-image: url('~assets/header/lines.png');
  z-index: -2;
}
@media (max-width: 991px) {
  .notebook {
    top: 0;
    right: -150px;
    width: 581px;
    height: 100%;
    background-position: 0 95px;
  }
  .row {
    margin-top: 50px;
  }
  .circle {
    bottom: 0;
  }
  .lines {
    bottom: -200px;
    left: -200px;
    background-size: cover;
  }
}
@media (max-width: 768px) {
  .row {
    margin-top: 20px;
  }
  .notebook, .lines, .circle {
    background-image: unset;
    display: none;
  }
}
</style>
