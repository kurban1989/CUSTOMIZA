<template>
  <section class="container relative align-self-center parent">
    <div class="row no-gutters justify-content-center align-items-start">
      <sections-headers :text="$t('Our latest cases')" />
    </div>
    <div class="carousel relative">
      <no-ssr>
        <swiper :options="swiperOption">
          <div
            v-for="item of 6"
            :key="item"
            class="case relative brdr-r-5 swiper-slide"
            :class="item % 2 === 0 ? 'mrt60' : ''"
          >
            <p class="date">
              {{ $t('Date of the application') }}: {{ new Date(Date.now()).toLocaleDateString($i18n.locale, optionDate) }}
            </p>
            <p class="header-question">
              {{ $t('Question') }}:
            </p>
            <p class="question">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id?
            </p>
            <p class="header-question header-question--reply">
              {{ $t('Reply from CUSTOMIZA') }}:
            </p>
            <p class="question header-question--reply">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.
              Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio,
              elementum in tempus ut, vehicula eu diam.
            </p>
          </div>
        </swiper>
      </no-ssr>
      <div class="swiper-pagination" />
      <div class="swiper-button-prev swiper-buttons no-outline" />
      <div class="swiper-button-next swiper-buttons no-outline" />
    </div>
    <div class="box1c" />
  </section>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import SectionsHeaders from '~/components/header/SectionsHeaders'

export default {
  name: 'LastCases',
  components: {
    SectionsHeaders,
    'no-ssr': NoSSR
  },
  data () {
    return {
      optionDate: {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      },
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerGroup: 2,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true,
        breakpoints: {
          768: {
            slidesPerView: 1,
            slidesPerGroup: 1
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/swiper';
</style>
<style lang="scss" scoped>
@import '~/assets/scss/border';
.carousel {
  width: 100%;
  .case {
    background: #FAFAFA;
    padding: 30px;
    width: 49%;
    max-height: 340px;
    overflow: hidden;
    text-overflow: ellipsis;

    &:after {
      content: '';
      width: 100%;
      height: 45px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgb(250,250,250);
      background: -moz-linear-gradient(180deg, rgba(250,250,250,0) 0%, rgba(250,250,250,1) 41%);
      background: -webkit-linear-gradient(180deg, rgba(250,250,250,0) 0%, rgba(250,250,250,1) 41%);
      background: linear-gradient(180deg, rgba(250,250,250,0) 0%, rgba(250,250,250,1) 41%);
    }
  }
  .mrt60 {
    margin-top: 60px;
  }
  .date {
    color: #ACA9A9;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .header-question {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    &--reply {
      color: #6B9638;
    }
  }
}
.question {
  font-size: 14px;
  word-break: break-word;
  margin-bottom: 18px;
}
.parent {
  height: 720px;
  margin-bottom: 120px;
}
.box1c {
  width: 500px;
  height: 240px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-image: url('~assets/body/box.png');
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;
}
@media (max-width: 768px) {
  .box1c {
    background-image: unset;
    display: none;
  }
  .parent {
    height: fit-content;
    margin-bottom: 50px;
  }
  .carousel {
    .mrt60 {
      margin: 0;
    }
  }
}
</style>
