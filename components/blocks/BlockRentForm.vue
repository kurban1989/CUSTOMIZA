<template>
  <section class="container relative wrapper-rent-form brdr-r-10">
    <form-area
      id="rentForm"
      :header="$t('Leave a request for rental programs 1C')"
      input-class="transparent"
      style-form="form-transparent"
      style-header="header-white"
      :checkbox-right="true"
      :without-text-area="true"
    >
      <div slot="checkboxgroup" class="relative col-sm checkbox-group brdr-r-10">
        <vue-perfect-scrollbar :settings="settings" class="relative wrapper-checkbox">
          <h4 class="h4">
            {{ $t('Choose a rental program') }}
          </h4>
          <base-checkbox
            v-for="(item, index) of programs"
            :id="`program${index}`"
            :key="index"
            :value="program"
            :checkbox-right="true"
            class="align-self-center checkbox-item"
            :class="(index + 1) === programs.length ? 'last-item' : ''"
          >
            {{ item }}
          </base-checkbox>
        </vue-perfect-scrollbar>
      </div>
    </form-area>
    <div class="yellow-coube" />
  </section>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import FormArea from '~/components/elements/FormArea'
import BaseCheckbox from '~/components/elements/BaseCheckbox'

export default {
  name: 'BlockRentForm',
  components: {
    VuePerfectScrollbar,
    BaseCheckbox,
    FormArea
  },
  data () {
    return {
      settings: {
        maxScrollbarLength: 70,
        wheelSpeed: 0.5
      },
      programs: [
        '1С:Бухгалтерия 8, версии КОРП, ПРОФ, базовая',
        '1С:Зарплата и управление персоналом 8, версии КОРП и ПРОФ',
        '1С:Управление торговлей 8.',
        '1С:Розница 8.',
        '1С:Упрощенка 8',
        '1С:Управление Холдингом 8',
        '1C:ERP Управление предприятием 2.0',
        '1С:Предприятие 8. Управление производственным предприятием',
        '1С:Комплексная автоматизация 8',
        '1С:Документооборот 8, версии КОРП и ПРОФ',
        '1С:Консолидация 8',
        '1С:Управление нашей фирмой 8',
        '1С:Налогоплательщик 8',
        '1С:Отчетность предпринимателя 8',
        '1С:Платежные документы 8',
        '1С:Бухгалтерия государственного учреждения 8',
        '1С:Зарплата и кадры бюджетного учреждения 8',
        '1С:Свод отчетов 8',
        '1С:Бюджетная отчетность 8',
        '1С:Документооборот государственного учреждения 8',
        '1С:Государственные и муниципальные закупки 8',
        '1С:Бюджет поселения 8',
        '1С:Бюджет муниципального образования 8',
        '1C:Деньги 8',
        '1С:Электронное обучение'
      ],
      program: false
    }
  }
}
</script>

<style>
.ps__rail-y {
  width: 10px;
  position: absolute;
  right: 0 !important;
  left: unset !important;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 25px;
}
.ps__thumb-y {
  width: 100%;
  position: absolute;
  left: 0;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 25px;
}
</style>
<style lang="scss" scoped>
@import '~/assets/scss/border';
.wrapper-checkbox {
  padding-left: 15px;
  padding-top: 15px;
  max-height: 210px;
  overflow: hidden;
}
.wrapper-rent-form {
  display: flex;
  width: 100%;
  height: 600px;
  padding: 75px 40px;
  background: rgb(155,197,104);
  background: -moz-linear-gradient(45deg, rgba(155,197,104,1) 0%, rgba(107,150,56,1) 43%);
  background: -webkit-linear-gradient(45deg, rgba(155,197,104,1) 0%, rgba(107,150,56,1) 43%);
  background: linear-gradient(45deg, rgba(155,197,104,1) 0%, rgba(107,150,56,1) 43%);
  overflow: visible;
  margin-top: 73px;
  margin-bottom: 116px;
  pointer-events: all;
  z-index: 3;

  &:before {
    content: '';
    width: 420px;
    height: 270px;
    position: absolute;
    bottom: -100px;
    right: 50px;
    background-image: url('~assets/body/beautify-box1c.png');
    background-repeat: no-repeat;
    background-size: 91% 99%;
    background-position: right;
  }

  &:after {
    content: '';
    width: 100%;
    height: 66px;
    position: absolute;
    bottom: -82px;
    left: 0;
    background-image: url('~assets/body/shadow.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
}
.checkbox-group {
  max-height: 220px;
  margin-left: 10px;
  margin-bottom: 10px;
  padding: 5px;
  padding-bottom: 0;
  background: rgba(255, 255, 255, 0.05);

  .h4 {
    font-size: 18px;
    color: #fff;
    line-height: 17px;
    margin-top: 0;
    margin-bottom: 20px;
  }
}
.checkbox-item {
  margin-bottom: 16px;
  padding-right: 40px;

  &:after {
    content: '';
    width: 91%;
    height: 1px;
    background: rgba(255, 255, 255, 0.36);
    position: absolute;
    left: 0;
    bottom: -10.5px;
  }
}
.last-item {
  &:after {
      height: 0;
    }
}
/deep/ .placeholder {
  color: rgba(255, 255, 255, 0.5);
}
/deep/ .form-transparent {
  width: 100%;
}
/deep/ .input-wrap {
  width: 520px;
}
/deep/ .header-white {
  text-align: center;
}
/deep/ .primary {
  margin-top: 25px;
  margin-right: 30px;
  .btn-text {
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.31);
  }
}
/deep/ .for-leave-rent {
  .row {
    margin-bottom: 20px;
  }
}
.yellow-coube {
  position: absolute;
  top: 25px;
  left: 0;
  width: 170px;
  height: 180px;
  transform: translate(-53%, 0);
  background-image: url('~assets/header/yellow-coube.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
@media (max-width: 991px) {
  .wrapper-rent-form {
    padding: {
      top: 56px;
      left: 20px;
      right: 20px;
      bottom: 421px;
    }

    &:before {
      width: 420px;
      height: 255px;
      right: -5px;
    }
  }
  .checkbox-group {
    min-width: 395px;
  }
  .for-leave-rent {
    width: fit-content;
  }
  /deep/ .input-wrap {
    width: 273px;
  }
}
@media (max-width: 768px) {
  .wrapper-rent-form {
    margin: {
      top: 20px;
    }
    padding: {
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 0;
    }
    height: fit-content;
    height: -webkit-fill-available;

    &:before {
      width: 100%;
      height: 29%;
      right: auto;
      bottom: -155px;
      background-position: center;
      background-size: contain;
    }
    &:after {
      content: unset;
    }
  }
  .yellow-coube {
    background-image: unset;
    display: none;
  }
  .checkbox-group {
    height: 250px;
    max-height: 250px;
    margin-top: 20px;
    margin-left: 0;
    min-width: 100%;
    padding: 20px;
    padding-right: 10px;
  }
  .wrapper-checkbox {
    padding: 0;
    height: 210px;
  }
  /deep/ .for-leave-rent .row {
    margin-bottom: 10px;
  }
  /deep/ .input-wrap {
    width: 100%;
    padding: 12px 15px;
  }
  /deep/ .primary {
    margin-top: 20px;
    margin-right: 0;
    .btn-text {
      font-size: 14px;
    }
  }
}
</style>
