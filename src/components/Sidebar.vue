<template>
  <aside :class="['sidebar', {active: sidebar}]">
    <div class="sidebar__header">
      <button class="sidebar__button" @click="close">Скрыть</button>
      <h1 class="sidebar__title">Timelocker.</h1>
    </div>
    <div class="sidebar__settings settings">
      <h2 class="settings__title">Настройки</h2>
      <ul class="settings__list">
        <li class="settings__item settings__item--flex">
          <span>Начало дня</span>
          <vue-timepicker close-on-complete lazy v-model="timeValue" :minute-interval="5" format="HH:mm"></vue-timepicker>
        </li>
        <li class="settings__item settings__item--flex">
          <span>Интервал</span>
          <NumberInputSpinner
          :min="0"
          :max="60"
          :step="10"
          inputClass="interval__input"
          buttonClass="interval__button"
          v-model="interval"
          />
        </li>
        <li class="settings__item">
          <p-check v-model="check" class="pretty p-image p-plain p-smooth">
            Отображать текущее время
            <img slot="extra" class="image" src="../assets/images/check.svg">
          </p-check>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import NumberInputSpinner from 'vue-number-input-spinner';
import PCheck from 'pretty-checkbox-vue/check';
import 'pretty-checkbox/src/pretty-checkbox.scss';

export default {
  name: 'Sidebar',
  components: {
    VueTimepicker,
    NumberInputSpinner,
    PCheck
  },
  computed: {
    ...mapState('settings', ['sidebar', 'startOfWork', 'intervalValue', 'showInitialTime']),
    timeValue: {
      get () {
        return this.startOfWork;
      },
      set (value) {
        this.$store.commit('settings/setStartOfWorkTime', value);
      }
    },
    interval: {
      get () {
        return this.intervalValue;
      },
      set (value) {
        this.$store.commit('settings/setIntervalValue', value);
      }
    },
    check: {
      get () {
        return this.showInitialTime;
      },
      set (value) {
        this.$store.commit('settings/toggleShowInitialTime', value);
      }
    }
  },
  methods: {
    close () {
      this.$store.commit('settings/toggleSidebar');
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  height: 100vh;
  position: fixed;
  top: 0px;
  width: $sidebarWidth;
  background: $sidebarMainBg;
  transition: $transition;
  color: $secondaryFont;
  z-index: 10000;
  @media screen and (max-width: 1200px) {
    transform: translateX(-100%);
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
  &.active {
    transform: translateX(0%);
  }

  .sidebar__header {
    position: relative;
    background: $primaryGradient;
    padding: 20px;
    min-height: $headerHeight;
    .sidebar__button {
      display: none;
      @media screen and (max-width: 640px) {
        display: block;
        position: absolute;
        font-size: 0;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background: url('../assets/images/close.svg') no-repeat 50% 50% transparent;
        background-size: cover;
      }
    }
  }
}

.settings {
  .settings__title {
    background: $sidebarSecondaryBg;
    padding: 15px;
    font-weight: 400;
  }
  .settings__list {
    padding: 20px;
    .settings__item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}

.vue__time-picker {
  border: none;
  width: 50px;
  .clear-btn {
    display: none;
  }
  .display-time {
    width: 100%;
    background: transparent;
    border: none;
    color: $secondaryFont;
    font-size: 16px;
    font-family: $blogger;
    cursor: pointer;
    &::placeholder {
      color: $secondaryFont;
      font-family: $blogger;
    }
  }
}

.interval__input {
  background: transparent;
  color: $secondaryFont;
  border: none;
  padding: 0;
  margin: 0;
  text-align: center;
  font-family: $blogger;
  width: 50px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.interval__button {
  color: $secondaryFont;
  cursor: pointer;
  vertical-align: middle;
}

.settings__item--flex {
  span {
    margin-right: 10px;
  }
  display: flex;
}
</style>
