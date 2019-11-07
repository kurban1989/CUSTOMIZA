<template>
  <section class="relative map-area">
    <div class="container nameplate">
      <div class="nameplate__info relative">
        <h5 class="h5">
          {{ $t('Our contacts') }}
        </h5>
        <p class="separator">
          ____
        </p>
        <p class="nameplate__tel-email">
          8 (800) 999-99-99
          <br>
          sales@customiza.ru
        </p>
        <h5 class="h5--office">
          {{ $t('Head Office Address:') }}
        </h5>
        <p class="nameplate__tel-email">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla quam velit, vulputate eu.
        </p>
      </div>
    </div>
    <yandex-map
      :settings="settings"
      :options="mapOptions"
      :coords="mapOptions.center"
      :scroll-zoom="false"
      @map-was-initialized="setObjectMap"
    >
      <ymap-marker
        :marker-id="'office'"
        :coords="mapOptions.center"
        :balloon-template="balloonTemplate"
        :icon="{
          layout: 'default#image',
          imageHref: '/baloon.svg',
          imageSize: [43, 51],
          imageOffset: [-20, -50]
        }"
      />
    </yandex-map>
  </section>
</template>

<script>
const isServer = typeof window === 'undefined'

export default {
  name: 'Contacts',
  data () {
    return {
      yMap: {}
    }
  },
  computed: {
    balloonTemplate () {
      return `
        <p>Головной офис</p>
      `
    },
    settings () {
      return {
        apiKey: 'b6ae3e63-aa63-422f-9d84-5db7fe63c0a1',
        lang: this.$i18n.locale,
        coordorder: 'latlong',
        version: '2.1'
      }
    },
    mapOptions () {
      return Object.assign({}, {
        center: [53.524167, 49.295639],
        zoom: 10
      },
      {
        searchControlProvider: 'yandex#search'
      })
    },
    ymaps () {
      return !isServer ? window.ymaps : undefined
    }
  },
  methods: {
    setObjectMap (objectMap) {
      if (!this.ymaps) {
        return
      }

      const zoomControl = new this.ymaps.control.ZoomControl({
        options: {
          adjustMapMargin: true,
          size: 'small',
          left: 'auto',
          right: 40,
          top: 200
        }
      })
      this.yMap = objectMap
      this.yMap.margin.addArea({
        left: 0,
        top: 0,
        width: 78,
        height: 100
      })
      this.yMap.controls.remove('zoomControl')
      this.yMap.controls.remove('geolocationControl')
      this.yMap.controls.remove('trafficControl')
      this.yMap.controls.remove('fullscreenControl')
      this.yMap.controls.remove('typeSelector')
      this.yMap.controls.remove('rulerControl')
      this.yMap.controls.remove('searchControl')
      this.yMap.controls.add(zoomControl)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-left: 0;
}
.map-area {
  width: 100vw;
  height: 500px;
}
.nameplate {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 2;

  &__info {
    width: 460px;
    padding: 40px;
    background: #F5F5F5;
    left: 0;
    pointer-events: all;
    box-shadow: 2px 5px 12px 1px rgba(0, 0, 0, 0.18);
  }

  &__tel-email {
    font-size: 14px;
    margin-bottom: 13px;
    line-height: 24px;
  }
}
.h5 {
  font-size: 18px;
  color: #6B9638;
  margin-bottom: 0;
  &--office {
    font-size: 16px;
    margin-bottom: 13px;
    color: #000;
  }
}
.separator {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 28px;
}
.ymap-container {
  position: relative;
  height: 100%;
  padding-top: 50px;
}
@media (max-width: 991px) {
  .nameplate {
    &__info {
      width: 250px;
    }
  }
}
@media (max-width: 1201px) {
  .nameplate {
    &__info {
      width: 288px;
    }
  }
}
@media (max-width: 768px) {
  .nameplate {
    left: 15px;
    transform: translateX(0%);
    width: 96%;

    &__info {
      width: 100%;
      padding: 20px;
    }
  }
  .map-area {
    height: 700px;
  }
}

@media (max-width: 321px) {
  .map-area {
    height: 650px;
  }
  .nameplate {
    top: 10px;
  }
}
</style>
<style>
.ymaps-2-1-74-controls__control {
  left: auto !important;
  right: 40px !important;
  top: 200px !important;
  background: #fff;
  border-radius: 25px;
  padding: 12px 0;
}
.ymaps-2-1-74-float-button {
  box-shadow: unset !important;
}
@media (max-width: 768px) {
  .ymaps-2-1-74-controls__control {
    right: 30px !important;
    top: 270px !important;
  }
}
</style>
