<template>
  <section id="nav_cases" class="container relative align-self-center parent">
    <div class="row no-gutters justify-content-center align-items-start">
      <sections-headers :text="$t('Our latest cases')" />
    </div>
    <div class="carousel relative">
      <no-ssr>
        <swiper v-if="cases.length" :options="swiperOption">
          <div
            v-for="(item, index) of cases"
            :key="index"
            class="case relative brdr-r-5 swiper-slide"
            :class="index % 2 === 0 ? 'mrt60' : ''"
          >
            <p class="date">
              {{ $t('Date of the application') }}: {{ new Date(item.date_of_application).toLocaleDateString($i18n.locale, optionDate) }}
            </p>
            <p class="header-question">
              {{ $t('Question') }}:
            </p>
            <p class="question">
              {{ item.question | htmldecode | capitalize }}
            </p>
            <p class="header-question header-question--reply">
              {{ $t('Reply from CUSTOMIZA') }}:
            </p>
            <p class="question header-question--reply" v-html="deCode(item.answer)" />
            <nuxt-link class="case__more-read" :to="localePath({ path: `${$i18n.locale !== 'ru' ? '/en' : ''}case/views?id=${item.id}` })">
              {{ $t('Read completely') }}
            </nuxt-link>
          </div>
        </swiper>
      </no-ssr>
      <div class="swiper-pagination" />
      <div class="swiper-button-prev swiper-buttons no-outline" />
      <div class="swiper-button-next swiper-buttons no-outline" />
    </div>
    <div class="row justify-content-center place-button">
      <secodary-button class="align-self-end" @click="showAllCase">
        <span>
          {{ $t('show all cases') | capitalize }}
        </span>
      </secodary-button>
    </div>
    <div class="box1c" />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import NoSSR from 'vue-no-ssr'
import SectionsHeaders from '~/components/header/SectionsHeaders'
import SecodaryButton from '~/components/elements/SecodaryButton'
import casesMixin from '~/mixins/cases'

export default {
  name: 'LastCases',
  components: {
    SectionsHeaders,
    SecodaryButton,
    'no-ssr': NoSSR
  },
  mixins: [casesMixin],
  data () {
    return {
      optionDate: {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      },
      swiperOption: {
        wrapperClass: 'swiper-wrapper',
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
  },
  computed: {
    ...mapState({
      cases: state => state.readyCase.casesForUser || []
    })
  },
  beforeMount () {
    this.$store.dispatch('readyCase/get')
  },
  methods: {
    showAllCase () {
      this.$router.push(`${this.$i18n.locale !== 'ru' ? '/en' : ''}/case/show-cases`)
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
      height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgb(250,250,250);
      background: -moz-linear-gradient(180deg, rgba(250,250,250,0) 0%, rgba(250,250,250,1) 41%);
      background: -webkit-linear-gradient(180deg, rgba(250,250,250,0) 0%, rgba(250,250,250,1) 41%);
      background: linear-gradient(180deg, rgba(250,250,250,0) 0%, rgba(250,250,250,1) 41%);
    }

    &__more-read {
      position: absolute;
      left: 30px;
      bottom: 10px;
      font-size: 14px;
      color: #6B9638;
      text-decoration: underline;
      z-index: 1;
      &:hover {
        color: #2F5008;
      }
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
  width: 210px;
  height: 200px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url('~assets/body/box.webp');
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
    padding-bottom: 40px;
  }
  .carousel {
    .mrt60 {
      margin: 0;
    }
  }
}
.place-button {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    left: 54%;
    z-index: 1;
  }
}
</style>
