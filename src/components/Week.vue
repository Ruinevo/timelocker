<template>
    <tr class="week__list">
      <td>День недели</td>
      <td v-for="day in WEEK_DAYS" :key="day">{{ day }}</td>
    </tr>
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
