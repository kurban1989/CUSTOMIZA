<template>
  <div class="wrapper relative">
    <section class="container relative align-self-center">
      <div class="row no-gutters justify-content-center align-items-start">
        <sections-headers :text="$t('What do you end up with?')" />
      </div>
      <div class="row">
        <div class="col-sm">
          <icon-posts class="content-center" background-color="#fff" />
          <div class="info">
            <h3 class="header">
              {{ $t('Employee Competency') }}
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quasi ratione quam illo officia quaerat molestias natus animi ea?
            </p>
          </div>
        </div>
        <div class="col-sm">
          <icon-posts class="content-center" background-color="#fff" />
          <div class="info">
            <h3 class="header">
              {{ $t('Right choice and embedded solution') }}
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quasi ratione quam illo officia quaerat molestias natus animi ea?
            </p>
          </div>
        </div>
        <div class="col-sm">
          <icon-posts class="content-center" background-color="#fff" />
          <div class="info">
            <h3 class="header">
              {{ $t('Designed by revision documentation') }}
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quasi ratione quam illo officia quaerat molestias natus animi ea?
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SectionsHeaders from '~/components/header/SectionsHeaders'
import IconPosts from '~/components/elements/IconPosts'

export default {
  name: 'WhatDoEndUpWith',
  components: {
    SectionsHeaders,
    IconPosts
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100vw;
  height: 1000px;
  background-image: url('~assets/body/lines.svg'), url('~assets/body/diagonal-background.jpg');
  background-repeat: no-repeat;
  background-position: bottom right, 0 0;
  background-size: auto, 100% 100%;
  transform: translateY(-55px);
  pointer-events: none;
  padding-top: 130px;
  z-index: -1;
}
.info {
  height: 480px;
  text-align: center;
  max-height: 330px;
  overflow: hidden;
  text-overflow: ellipsis;
  p {
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
}
.header {
  font-size: 24px;
  font-weight: 500;
  color: #6B9638;
  margin-top: 20px;
  margin-bottom: 10px;
}
/deep/ .icon {
  width: 160px;
  height: 160px;
  background-size: 80px 77px;
}

@media (max-width: 992px) {
  .wrapper {
    padding-top: 0;
    height: 830px;
    background-position: bottom 20px right, 0 0;
    background-size: auto, cover;
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .wrapper {
    background-image: unset;
    height: fit-content;
    transform: translateY(0%);
    padding: 30px 0;
    margin: {
      top: 10px;
      left: 0;
      right: 0;
      bottom: 30px;
    }
    background-color: #F3F3F3;
  }
  .header {
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 10px;
  }
  .info {
    height: fit-content;
    margin-bottom: 20px;
  }
  /deep/ .icon {
    width: 100px;
    height: 100px;
    background-size: auto;
  }
}
</style>
