<template>
  <tbody v-selectable="{
    selectedGetter: selectedGetter,
    selectedSetter: selectedSetter,
    selectingSetter: selectingSetter
  }" class="table" data-items=".item" ref="table">

    <tr v-for="(item, i) in times" :key="i">
      <td v-for="(item, index) in 7" :class="['item', { selected: !!selected[i * 7 + index], selecting: !!selecting[i * 7 + index] }]" :key="index">{{ i }}, {{ index }}</td>
    </tr>
    <div class="selection"></div>
  </tbody>
</template>

<script>
import selectable from 'vue-selectable';

export default {
  name: 'Selectable',
  data () {
    return {
      times: ['6:00', '7:00', '8:00', '9:00'],
      selected: [],
      selecting: [],
      items: ['abc', 'bcd', 'cde']
    }
  },
  directives: { selectable },
  computed: {
    active () {
      const match = this.selected.map((item, index) => {
        if (item) return index;
      });
      return match.filter(item => item);
    }
  },
  methods: {
    selectedGetter () { return this.selected; },
    selectedSetter (v) {
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
          const currRowspan = selected.reduce((initial, cell) => {
            return cell.rowSpan + initial;
          }, 0);
          return currRowspan + acc;
        }, 0);

        console.log(rowspan, 'row');
        console.log(colspan, 'col');

        /** первую ячейку расширяем, остальные удаляем */
        const [first, ...other] = Array.from(this.$refs.table.querySelectorAll('.selected'));
        other.forEach(item => item.remove())
        if (first) {
          first.rowSpan = rowspan;
          first.colSpan = colspan; // мы должны получить сумму colspan всех ячеек
          // first.width = `${width}px !important`;
          // first.height = `${lines.length * 20}px !important`;
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
.selection {
  position: absolute;
  border: 1px dotted #000;
  z-index: 9999;
  top: 0;
  left: 0;
  cursor: default;
  display: none;
}

.selected {
  background: orange;
}

.selecting {
  background: yellow;
}
</style>
