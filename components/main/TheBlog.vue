<template>
  <section class="container relative">
    <div class="row no-gutters justify-content-center align-items-start">
      <sections-headers :text="$t('CUSTOMIZA Blog')" />
    </div>
    <div class="row">
      <no-ssr>
        <div class="carousel relative" :class="{ 'no-swiper': !swiperInitialized }">
          <swiper :options="swiperOption" @ready="setSwiper">
            <div
              v-for="(post, index) of posts"
              :key="index"
              class="post"
            >
              <p class="post__header">
                {{ post.title }}
              </p>
              <p class="date">
                {{ new Date(Date.now()).toLocaleDateString($i18n.locale, optionDate) }}
              </p>
              <div class="post__area">
                <p>
                  {{ post.body }}
                </p>
              </div>
              <nuxt-link class="post__more" to="/">
                {{ $t('Read completely') }}
              </nuxt-link>
            </div>
            <div slot="pagination" class="swiper-pagination2" />
          </swiper>
        </div>
      </no-ssr>
    </div>
    <div class="row justify-content-center place-button">
      <secodary-button class="align-self-end">
        <span>
          {{ $t('Go to the section with articles') }}
        </span>
      </secodary-button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import NoSSR from 'vue-no-ssr'
import SectionsHeaders from '~/components/header/SectionsHeaders'
import SecodaryButton from '~/components/elements/SecodaryButton'
const isServer = typeof window === 'undefined'

export default {
  name: 'TheBlog',
  components: {
    SectionsHeaders,
    SecodaryButton,
    'no-ssr': NoSSR
  },
  data () {
    return {
      swiperObj: null,
      swiperInitialized: false,
      optionDate: {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      },
      swiperOption: {
        wrapperClass: 'swiper-wrapper2',
        init: false,
        slidesPerView: 6,
        spaceBetween: 10,
        slidesPerGroup: 6,
        loop: false,
        resistanceRatio: 0,
        loopFillGroupWithBlank: false,
        pagination: {
          el: '.swiper-pagination2',
          clickable: true
        },
        observer: true,
        breakpoints: {
          768: {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            slideClass: 'post',
            resistanceRatio: 0.85
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      posts: state => state.directory.posts.slice(6, 12)
    }),
    innerWidth () {
      return !isServer ? window.innerWidth : undefined
    }
  },
  beforeMount () {
    this.$store.dispatch('directory/getPosts')
    this.setEventResize()
  },
  beforeDestroy () {
    this.swiperObj.destroy()
    if (!isServer) {
      window.removeEventListener('resize', this.swiperInit)
    }
  },
  methods: {
    setSwiper (swiperObj) {
      this.swiperObj = swiperObj
      this.swiperInit()
    },
    setEventResize () {
      if (!isServer) {
        window.addEventListener('resize', this.swiperInit)
      }
    },
    swiperInit () {
      if (!isServer) {
        if (window.innerWidth < 768 && this.swiperObj && !this.swiperInitialized) {
          this.swiperInitialized = true
          this.swiperObj.init()
        } else if (window.innerWidth > 768 && this.swiperInitialized) {
          this.swiperInitialized = false
          // this.swiperObj.destroy()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.no-swiper {
  .swiper-wrapper2 {
    flex-wrap: wrap;
  }
  .post {
    margin: 5px !important;
  }
}
</style>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  padding: 0 16px;
}
.place-button {
  position: relative;
  padding-top: 40px;
  z-index: 1;
}
.post {
  flex: 0 0 48%;
  width: 48%;
  max-height: 325px;
  background: #FAFAFA;
  margin-bottom: 10.5px;
  padding: 18px 20px 30px;
  margin: 5px;

  &__header {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  &__area {
    width: 100%;
    max-height: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 20px;

    p {
      width: inherit;
    }
  }

  &__more {
    font-size: 14px;
    color: #6B9638;
    text-decoration: underline;
    &:hover {
      color: #2F5008;
    }
  }
}
p {
  font-size: 14px;
  line-height: 17px;
  word-break: break-word;
}
.date {
  color: #ACA9A9;
  font-size: 14px;
  margin-bottom: 20px;
}
@media (min-width: 992px) {
  .post {
    flex: 0 0 32.2%;
    max-width: 32.2%;
    height: fit-content;
  }
}

@media (max-width: 768px) {
  .post {
    flex: 0 0 100%;
    max-width: 100%;
    margin: 0;
    margin-bottom: 20px;
  }
  .place-button {
    padding: 0 16px;
    padding-top: 20px;
    margin-bottom: 30px;
  }
  /deep/ .secondary {
    width: 100%;
    max-width: 400px;
  }
}
</style>
