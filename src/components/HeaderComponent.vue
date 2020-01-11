<template>
  <header :class="['header', {mobile: mobile && sidebar}]">
      <button class="header__button" @click="toggle"></button>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState('settings', ['sidebar']),
    mobile () {
      return window.innerWidth <= 1200;
    }
  },
  methods: {
    toggle () {
      this.$store.commit('settings/toggleSidebar');
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  transition: $transition;
  display: flex;
  align-items: center;
  &.mobile {
    padding-left: $sidebarWidth;
  }
  min-height: $headerHeight;
  background: $secondaryBg;
  padding-top: 20px;
  padding-bottom: 20px;
  .header__button {
    display: none;
    background: url('../assets/images/menu.svg') no-repeat 50% 50%;
    background-size: cover;
    width: 18px;
    height: 18px;
    margin-left: 20px;
    @media screen and (max-width: 1200px) {
      display: block;
    }
  }
}

</style>
