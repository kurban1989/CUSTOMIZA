<template>
  <section id="nav_articles" class="container relative">
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
              class="main-post"
            >
              <p class="main-post__header">
                {{ post.title }}
              </p>
              <p class="date">
                {{ new Date(post.date).toLocaleDateString($i18n.locale, optionDate) }}
              </p>
              <div class="main-post__area">
                <p>
                  {{ decode(post.text) }}
                </p>
              </div>
              <nuxt-link class="main-post__more" :to="localePath({ path: 'articles/' + post.uid })">
                {{ $t('Read completely') }}
              </nuxt-link>
            </div>
            <div slot="pagination" class="swiper-pagination2" />
          </swiper>
        </div>
      </no-ssr>
    </div>
    <div class="row justify-content-center place-button">
      <secodary-button class="align-self-end" @click="showAllArt">
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
import { isClient, binary } from '~/helpers'

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
        // init: false,
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
            slideClass: 'main-post',
            resistanceRatio: 0.85
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      postsState: state => state.directory.posts
    }),
    posts () {
      return this.postsState && this.postsState.length ? this.postsState.slice(0, 6) : []
    },
    innerWidth () {
      return isClient ? window.innerWidth : undefined
    }
  },
  async asyncData ({ store }) {
    await store.dispatch('directory/getPosts')

    return {}
  },
  beforeMount () {
    this.$store.dispatch('directory/getPosts')
    this.setEventResize()
  },
  beforeDestroy () {
    if (isClient && this.swiperObj && this.swiperInitialized) {
      this.swiperObj.destroy()
      window.removeEventListener('resize', this.swiperInit)
    }
  },
  methods: {
    setSwiper (swiperObj) {
      this.swiperObj = swiperObj
      this.swiperInit()
    },
    setEventResize () {
      if (isClient) {
        window.addEventListener('resize', this.swiperInit)
      }
    },
    swiperInit () {
      if (isClient) {
        if (window.matchMedia('(max-width: 769px)').matches && this.swiperObj && !this.swiperInitialized) {
          this.swiperInitialized = true
          this.swiperObj.init()
        } else if (window.innerWidth > 768 && this.swiperInitialized) {
          this.swiperInitialized = false
          this.swiperObj.destroy()
        }
      }
    },
    enCode (b64Encoded) {
      try {
        return atob(b64Encoded)
      } catch (e) {
        return Buffer.from(b64Encoded, 'base64').toString()
      }
    },
    decode (code) {
      const formatText = binary.fromBinary(this.enCode(code))
        .replace(/(<p(.*?)>(.*?)<img\s(.*?)src(.*)>(.*?)<\/p>)/gm, '')
        .replace(/(&nbsp;)/gm, ' ')
        .replace(/(<(\/?[^>]+)>)/gm, '')
      return `${formatText.slice(0, 150)} ...`
    },
    showAllArt () {
      this.$router.push('/articles/articles')
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
@mixin textEllipsis($rows:2) {
  /*! autoprefixer: off */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: $rows;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  display: -moz-box;
}
.carousel {
  width: 100%;
  padding: 0 16px;
}
.place-button {
  position: relative;
  padding-top: 40px;
  z-index: 1;
}
.main-post {
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
    @include textEllipsis
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
  .main-post {
    flex: 0 0 32.2%;
    max-width: 32.2%;
    height: fit-content;
  }
}

@media (max-width: 768px) {
  .main-post {
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
