<template>
<div class="selectable" ref="scrollbox">
  <table v-if="tasks.length" class="selectable__table">
    <Week></Week>
    <tbody v-selectable="{
      selectedGetter: selectedGetter,
      selectedSetter: selectedSetter,
      selectingSetter: selectingSetter
    }" class="table" data-items=".item" ref="table">

      <tr v-for="(item, i) in times" :key="i">
        <td v-if="times.length" width="140px">{{ times[i] }}</td>
        <td
          v-for="(item, index) in days"
          :class="['item',{ selected: !!tasks[i * days + index], selecting: !!selecting[i * days + index] }]"
          :key="index"
          :colspan="tasks[i * days + index].colSpan"
          :rowspan="tasks[i * days + index].rowSpan"
          >
          {{ tasks[i * days + index].data }}
        </td>
      </tr>
      <div class="selection"></div>
    </tbody>
  </table>
</div>
</template>

<script>
import * as vueSelectable from 'vue-selectable';
import Week from '@/components/Week.vue';
import { mapState } from 'vuex';
import { WEEK_DAYS } from '@/constants.js';

export default {
  name: 'Selectable',
  components: {
    Week
  },
  data () {
    return {
      selected: [],
      selecting: [],
      days: WEEK_DAYS.length
    }
  },
  directives: {
    selectable: vueSelectable.default
  },
  computed: {
    active () {
      const match = this.selected.map((item, index) => {
        if (item) return index;
      });
      return match.filter(item => item);
    },
    ...mapState('settings', ['times', 'tasks'])
  },
  mounted () {
    vueSelectable.setOptions(this.$refs.table, { scrollingFrame: this.$refs.scrollbox });
  },
  methods: {
    selectedGetter (e) { return this.tasks; },
    selectedSetter (v, b, e) {
      this.selected = v;
      this.$nextTick(() => {
        /** получаем строки, в которых есть хоть одна выбранная ячейка */
        const lines = Array.from(this.$refs.table.querySelectorAll('tr')).filter(tr => {
          return Array.from(tr.cells).some(cell => cell.classList.contains('selected'));
        });

        if (!lines[0]) {
          return false;
        }

        /** получаем количество выбранных ячеек в строке */
        const columns = Array.from(lines[0].cells).filter(cell => cell.classList.contains('selected'));
        /** находим сумму colspan объединяемых ячеек */
        let colspan = columns.reduce((acc, curr) => {
          return curr.colSpan + acc;
        }, 0);

        let rowspan = lines.reduce((acc, curr) => {
          const selected = Array.from(curr.cells).filter(cell => cell.classList.contains('selected'));
          return selected[0].rowSpan + acc;
        }, 0);

        let height = lines.reduce((acc, curr) => {
          const selected = Array.from(curr.cells).filter(cell => cell.classList.contains('selected'));
          return parseFloat(getComputedStyle(selected[0]).height) + acc;
        }, 0);

        /** первую ячейку расширяем, остальные удаляем */

        if (this.selected.length) {
          console.log(this.selected);
          this.selected = this.selected.shift();
          this.selected[0].rowSpan = rowspan;
          this.selected[0].colSpan = colspan;
          this.selected[0].height = `${height}px !important`;
        }
      });
    },
    selectingSetter (v) {
      this.selecting = v;
    }
  }
}
</script>

<style lang="scss">

.selectable {
  overflow-y: scroll;
  height: calc(100vh - #{$headerHeight} - #{$calendarHeight });
  .selectable__table {
    border-collapse: collapse;
    width: 100%;
    td {
      border: 1px solid #f1f1f1;
      background: #fafafa;
      padding: 20px;
      text-align: center;
      &.selected {
        color: #fff;
      }
    }
    .selection {
      position: absolute;
      border: 1px dotted #000;
      z-index: 9999;
      top: 0;
      left: 0;
      cursor: default;
      display: none;
    }

    .task {
      background: $primaryGradient;
    }

    .selecting {
      background: lighten($primary, 30%);
    }
  }
}

</style>
