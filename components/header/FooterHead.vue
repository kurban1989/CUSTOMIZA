<template>
  <div class="container wrapper relative">
    <div class="row">
      <form-area
        id="headerForm"
        :header="$t('Leave a request for a free consultation for questions related to 1C!')"
      />
    </div>
    <div class="circle bg-standart-options" />
    <div class="notebook" />
    <div class="lines bg-standart-options" />
  </div>
</template>
<script>
import FormArea from '~/components/elements/FormArea'
export default {
  name: 'FooterHead',
  components: {
    FormArea
  }
}
</script>
<style lang="scss" scoped>
.row {
  margin-top: 100px;
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
  background-image: url('~assets/header/notebook.png');
  background-repeat: no-repeat;
  background-position: 0 -57px;
  background-size: contain;
  top: -70px;
  right: -90px;
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
    margin-top: 70px;
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
