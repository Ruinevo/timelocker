<template>
  <main :class="['content', {active: active && sidebar}]">
      <Calendar></Calendar>
      <Selectable></Selectable>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Selectable from '@/components/Selectable.vue';
import Calendar from '@/components/Calendar.vue';
export default {
  name: 'ContentComponent',
  components: {
    Selectable,
    Calendar
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
