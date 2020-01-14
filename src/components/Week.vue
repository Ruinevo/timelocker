<template>
    <ul class="week__list">
      <li class="week__item item">День недели</li>
      <li class="week__item item" v-for="day in WEEK_DAYS" :key="day">{{ day }}</li>
    </ul>
</template>

<script>
import { WEEK_DAYS } from '@/constants.js';
export default {
  name: 'Week',
  data () {
    return {
      WEEK_DAYS
    }
  }
}
</script>

<style lang="scss" scoped>
.week__list {
  .week__item {
    display: inline-block;
    width: $columnWidth;
  }
}
</style>
