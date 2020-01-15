<template>
  <main :class="['content', {active: active && sidebar}]">
      <Selectable></Selectable>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Selectable from '@/components/Selectable.vue';
export default {
  name: 'ContentComponent',
  components: {
    Selectable
  },
  computed: {
    ...mapState('settings', ['sidebar']),
    active () {
      return window.innerWidth > 640;
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  transition: $transition;
  &.active {
    padding-left: $sidebarWidth;
  }
}

</style>
