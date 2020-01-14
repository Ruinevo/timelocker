<template>

      <ul v-if="tasks.length" v-selectable="{
        selectedGetter: selectedGetter,
        selectedSetter: selectedSetter,
        selectingSetter: selectingSetter
        }" class="column"
        data-items=".item"
        ref="column"
        :data-box="`.selectbox${lineIndex}`"
      >
        <li
          v-for="(item, index) in tasks[lineIndex]"
          :class="['item', `item${lineIndex}`,{ selected: !!selected[index], selecting: !!selecting[index], task: item.task }]"
          :key="index"
          v-show="item.show"
          :style="{ height: `${item.height}px` }"
          >
          {{ item.height }}
        </li>
        <div :class="['selectbox', `selectbox${lineIndex}`]"></div>
      </ul>

</template>

<script>
import * as selectable from 'vue-selectable';
import { mapState } from 'vuex';
import { WEEK_DAYS } from '@/constants.js';
export default {
  name: 'SelectableColumn',
  props: ['lineIndex'],
  data () {
    return {
      selected: [],
      selecting: [],
      days: WEEK_DAYS.length
    }
  },
  directives: {
    selectable: selectable.default
  },
  computed: {
    ...mapState('tasks', ['times', 'tasks']),
    active () {
      return this.selected.map((item, index) => {
        if (item) return index;
      }).filter(item => item !== undefined);
    }
  },
  methods: {
    selectedGetter (e) { return this.selected; },
    selectedSetter (v) {
      this.selected = v;
      this.$nextTick(() => {
        if (!this.active.length) {
          return false;
        }
        const selected = Array.from(this.$refs.column.querySelectorAll('.selected'));
        let height = selected.reduce((acc, curr) => {
          return parseFloat(getComputedStyle(curr).height) + acc;
        }, 0);
        this.$store.commit('tasks/addTask', {
          active: this.active,
          lineIndex: this.lineIndex,
          height
        });
      });
    },
    selectingSetter (v) {
      this.selecting = v;
    }
  },
  mounted () {
    this.$nextTick(() => selectable.setSelectableItems(this.$refs.column, `.item${this.lineIndex}`));
  }
}
</script>

<style lang="scss" scoped>

.column {
  width: $columnWidth;
  position: relative;
}

.selecting {
  background: lighten($primary, 30%);
}

.selectbox {
    position: absolute;
    border: 1px dotted #000;
    z-index: 9999;
    top: 0;
    left: 0;
    cursor: default;
    display: none;
}

</style>
