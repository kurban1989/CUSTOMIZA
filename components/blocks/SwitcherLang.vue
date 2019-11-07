<template>
  <div class="switcher-lang">
    <span :class="$i18n.locale === 'ru'? 'flag-rus' : 'flag-eng'" />
    <span class="label-lang">
      {{ $t('labelLangText') }}
    </span>

    <div class="switcher-lang--hadler">
      <nuxt-link
        class="check-lang link"
        :to="switchLocalePath('ru')"
      >
        <span class="flag-rus" />
        <span class="label-lang">
          РУС
        </span>
      </nuxt-link>

      <nuxt-link
        class="check-lang link"
        :to="switchLocalePath('en')"
      >
        <span class="flag-eng" />
        <span class="label-lang">
          ENG
        </span>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SwitcherLang'
}
</script>
<style lang="scss" scoped>
.flag-rus {
  background-image: url('~assets/header/rus.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.flag-eng {
  background-image: url('~assets/header/eng.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.label-lang {
  text-transform: uppercase;
  font-size: 14px;
}

.check-lang {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.switcher-lang {
  display: flex;
  width: 60px;
  height: 24px;
  margin-left: 22px;
  position: relative;
  cursor: pointer;

  span {
    display: inline-block;
    &:first-child {
      width: 24px;
      height: 24px;
      margin-right: 9px;
    }
  }

  &--hadler {
    display: none;
    width: 74px;
    height: 65px;
    position: absolute;
    top: -1px;
    left: -5px;
    padding: 5px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 2px 1px 10px 2px #707070;
    z-index: 10;
  }

  &:hover {
    .switcher-lang--hadler {
      display: block;
    }
  }
}

.link {
  font-size: 14px;
  color: #000;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
