<template>
  <section class="container relative">
    <div class="row no-gutters justify-content-center align-items-start">
      <sections-headers :text="$t('How will we help you?')" />
    </div>
    <div class="row no-gutters what-are-useful">
      <div class="col-sm section">
        <icon-posts />
        <div class="col info">
          <h3 class="header">
            {{ $t('Online counseling') }}
          </h3>
          <p>
            {{ $t('posts.onlineConsul') }}
          </p>
        </div>
      </div>

      <div class="col-sm section">
        <icon-posts />
        <div class="col info">
          <h3 class="header">
            {{ $t('Help choosing a configuration') }}
          </h3>
          <p>
            {{ $t('posts.helpConfig') }}
          </p>
        </div>
      </div>

      <div class="col-sm section">
        <icon-posts />
        <div class="col info">
          <h3 class="header">
            {{ $t('Implement selected solutions') }}
          </h3>
          <p>
            {{ $t('posts.implementSelectedSolutions') }}
          </p>
        </div>
      </div>
    </div>
    <!-- second row -->
    <!-- <div class="row no-gutters what-are-useful">
      <div class="col-sm section">
        <icon-posts />
        <div class="col info">
          <h3 class="header">
            {{ $t('Online counseling') }}
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quasi ratione quam illo officia quaerat molestias natus animi ea?
          </p>
        </div>
      </div>

      <div class="col-sm section align-self-lg-center">
        <icon-posts />
        <div class="col info">
          <h3 class="header">
            {{ $t('Help choosing a configuration') }}
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quasi ratione quam illo officia quaerat molestias natus animi ea?
          </p>
        </div>
      </div>

      <div class="col-sm section align-self-lg-end">
        <icon-posts />
        <div class="col info">
          <h3 class="header">
            {{ $t('Implement selected solutions') }}
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quasi ratione quam illo officia quaerat molestias natus animi ea?
          </p>
        </div>
      </div>
    </div> -->
    <div class="coube" />
    <div class="yellow-coube bg-standart-options" />
  </section>
</template>

<script>
import SectionsHeaders from '~/components/header/SectionsHeaders'
import IconPosts from '~/components/elements/IconPosts'

export default {
  name: 'HowHelpYou',
  components: {
    SectionsHeaders,
    IconPosts
  }
}
</script>

<style lang="scss" scoped>
.what-are-useful {
  min-height: 270px;
}
.header {
  font-size: 18px;
  font-weight: 500;
  color: #6B9638;
  margin-bottom: 19px;
}
.info {
  padding-top: 30px;
  p {
    font-size: 14px;
    line-height: 17px;
    word-break: break-word;
  }
}
.section {
  display: inline-flex;
}
.coube {
  position: absolute;
  top: 0;
  right: 0;
  width: 311px;
  height: 439px;
  transform: translate(55%, -50%);
  background-image: url('~assets/header/coube.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  z-index: -1;
}
.yellow-coube {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 250px;
  height: 300px;
  transform: translate(-60%, 50%);
  background-image: url('~assets/header/yellow-coube.png');
}
@media (max-width: 991px) {
  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .icon {
    margin: 0 auto;
  }
  .info {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .coube {
    width: 160px;
    height: 225px;
    transform: translate(60%, -55%);
    z-index: 2;
  }
  .yellow-coube {
    width: 150px;
    height: 160px;
    transform: translate(-70%, 60%);
  }
}

@media (max-width: 768px) {
  .coube, .yellow-coube {
    background-image: unset;
    display: none;
  }
  .header {
    font-size: 16px;
    margin-bottom: 15px;
  }
}
</style>
