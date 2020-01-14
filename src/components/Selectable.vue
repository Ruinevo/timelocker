<template>
<div class="selectable">
    <Week></Week>
    <div class="selectable__wrapper">
      <ul class="selectble__times times">
        <li class="times__item item" v-for="time in times" :key="time">{{ time }}</li>
      </ul>
      <SelectableColumn :lineIndex="index" v-for="(item, index) in days" :key="index"></SelectableColumn>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import SelectableColumn from '@/components/SelectableColumn.vue';
import Week from '@/components/Week.vue';
import { WEEK_DAYS } from '@/constants.js';

export default {
  name: 'Selectable',
  data () {
    return {
      days: WEEK_DAYS.length
    }
  },
  components: {
    SelectableColumn,
    Week
  },
  computed: {
    ...mapState('tasks', ['times'])
  }
}
</script>

<style lang="scss">

.selectable {
  overflow-y: scroll;
  height: calc(100vh - #{$headerHeight} - #{$calendarHeight });
  .selectable__wrapper {
    display: flex;
    .times {
      width: $columnWidth;
    }
  }
}

</style>
