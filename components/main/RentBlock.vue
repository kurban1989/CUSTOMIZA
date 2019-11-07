<template>
  <div class="wrapper-rent">
    <section class="container relative align-self-start">
      <div class="row no-gutters justify-content-center align-items-start">
        <sections-headers :text="$t('Rent 1C from CUSTOMIZA')" class="mrb" />
        <p class="paragrath">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi assumenda necessitatibus similique nemo dicta dolor.
        </p>
      </div>
      <div class="row">
        <div class="col-sm">
          <icon-posts class="content-center" background-color="#fff" />
          <div class="info">
            <h3 class="header">
              {{ $t('The advantage of renting') }} 1
            </h3>
          </div>
        </div>
        <div class="col-sm">
          <icon-posts class="content-center" background-color="#fff" />
          <div class="info">
            <h3 class="header">
              {{ $t('The advantage of renting') }} 2
            </h3>
          </div>
        </div>
        <div class="col-sm">
          <icon-posts class="content-center" background-color="#fff" />
          <div class="info">
            <h3 class="header">
              {{ $t('The advantage of renting') }} 3
            </h3>
          </div>
        </div>
      </div>
    </section>
    <block-rent-form />
  </div>
</template>

<script>
import SectionsHeaders from '~/components/header/SectionsHeaders'
import BlockRentForm from '~/components/blocks/BlockRentForm'
import IconPosts from '~/components/elements/IconPosts'

export default {
  name: 'RentBlock',
  components: {
    SectionsHeaders,
    BlockRentForm,
    IconPosts
  }
}
</script>

<style lang="scss" scoped>
.wrapper-rent {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 1000px;
  background-image: url('~assets/body/lines.svg'), url('~assets/body/diagonal-background.jpg');
  background-repeat: no-repeat;
  background-position: bottom right, 0 0;
  background-size: auto, 100% 100%;
  transform: translateY(-75px);
  pointer-events: none;
  padding-top: 200px;
  margin-bottom: 300px;
}
.header {
  font-size: 24px;
  font-weight: 500;
  color: #6B9638;
  margin-top: 20px;
  margin-bottom: 10px;
}
.info {
  text-align: center;
}
.paragrath {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-bottom: 74px;
}
.mrb {
  margin-bottom: 30px;
}

/deep/ .icon {
  width: 160px;
  height: 160px;
  background-size: 80px 77px;
}

@media (max-width: 768px) {
  .wrapper-rent {
    background-image: unset;
    background-color: #F3F3F3;
    transform: translateY(0%);
    margin-bottom: 500px;
    padding: {
      top: 30px;
      right: 15px;
      left: 15px;
    }
  }
  .mrb {
    margin-bottom: 20px;
  }
  .paragrath {
    margin-bottom: 20px;
  }
  .header {
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 30px;
    font-weight: bold;
  }
  /deep/ .icon {
    width: 100px;
    height: 100px;
    background-size: auto;
  }
}
</style>
