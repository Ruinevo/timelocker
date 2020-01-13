<template>
  <aside :class="['sidebar', {active: sidebar}]">
    <div class="sidebar__header">
      <button class="sidebar__button" @click="close">Скрыть</button>
      <h1 class="sidebar__title">Timelocker.</h1>
    </div>
    <div class="sidebar__settings settings">
      <h2 class="settings__title">Настройки</h2>
      <ul class="settings__list">
        <li class="settings__item">Время начала дня</li>
        <li class="settings__item">Временной интервал</li>
        <li class="settings__item">Отображать текущее время</li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapState('settings', ['sidebar'])
  },
  methods: {
    close () {
      this.$store.commit('settings/toggleSidebar');
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  top: 0px;
  width: $sidebarWidth;
  background: $sidebarMainBg;
  transition: $transition;
  color: $secondaryFont;
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
</style>
