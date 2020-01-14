<template>
  <perfect-scrollbar>
    <div class="selectable">
        <Week></Week>
        <div class="selectable__wrapper">
          <ul class="selectble__times times">
            <li class="times__item item" v-for="time in times" :key="time">{{ time }}</li>
          </ul>
          <SelectableColumn :columnIndex="index" v-for="(item, index) in days" :key="index"></SelectableColumn>
        </div>
    </div>

  </perfect-scrollbar>
</template>

<script>
import { mapState } from 'vuex';
import SelectableColumn from '@/components/SelectableColumn.vue';
import Week from '@/components/Week.vue';
import { WEEK_DAYS } from '@/constants.js';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';

export default {

  name: 'Selectable',
  data () {
    return {
      days: WEEK_DAYS.length,
      showModal: true,
      options: [1, 2, 3]
    }
  },
  components: {
    SelectableColumn,
    Week,
    PerfectScrollbar
  },
  computed: {
    ...mapState('tasks', ['times'])
  }
}
</script>

<style lang="scss">

.selectable {
  .selectable__wrapper {
    display: flex;
    .times {
      width: $columnWidth;
    }
  }
}

.ps {
  overflow-y: scroll;
  height: calc(100vh - #{$headerHeight} - #{$calendarHeight });
  .ps__thumb-y,
  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    background-color: $primary;
  }
}

</style>
