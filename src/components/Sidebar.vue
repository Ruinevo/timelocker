<template>
  <aside :class="['sidebar', {active: sidebar}]">
    <h1 class="sidebar__title">Timelocker.</h1>
    <div class="sidebar__settings settings">
      <h2 class="settings__title">Настройки</h2>
      <ul class="settings__list">
        <li class="settings__item">Время начала дня</li>
        <li class="settings__item">Временной интервал</li>
        <li class="settings__item">Отображать текущее время</li>
      </ul>
    </div>
    <button class="sidebar__button" @click="close">Скрыть</button>
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
  .sidebar__button {
    display: none;
    @media screen and (max-width: 640px) {
      display: block;
    }
  }
  .sidebar__title {
    background: $primary;
    padding: 20px;
    min-height: $headerHeight;
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
