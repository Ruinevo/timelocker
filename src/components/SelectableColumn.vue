<template>

      <ul v-if="tasks.length" v-selectable="{
        selectedGetter: selectedGetter,
        selectedSetter: selectedSetter,
        selectingSetter: selectingSetter
        }" class="column"
        data-items=".item"
        ref="column"
        :data-box="`.selectbox${columnIndex}`"
      >
        <perfect-scrollbar
          tag="li"
          :scrollXMarginOffset="10"
          v-for="(item, index) in tasks[columnIndex]"
          :class="['item', `item${columnIndex}`,{ selected: !!selected[index], selecting: !!selecting[index], task: Object.keys(item.data).length }]"
          :key="item.id"
          v-show="item.show"
          :style="{ height: `${item.height}px` }"
          >

          <div class="item__content" v-if="Object.keys(item.data).length">
            <p class="item__time">{{ item.data.start }} - {{ item.data.stop }}</p>
            <p class="item__name">{{ item.data.taskName }}</p>
            <p class="item__description">{{ item.data.taskDescription }}</p>

          </div>
          <button class="item__close" @mousedown.stop v-if="Object.keys(item.data).length" @click="deleteTask(item.id, columnIndex)">Удалить</button>
        </perfect-scrollbar>
        <div :class="['selectbox', `selectbox${columnIndex}`]"></div>
      </ul>

</template>

<script>
import * as selectable from 'vue-selectable';
import { mapState } from 'vuex';
import { WEEK_DAYS } from '@/constants.js';
import { eventBus } from '@/utils.js';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
export default {
  name: 'SelectableColumn',
  props: ['columnIndex'],
  components: {
    PerfectScrollbar
  },
  data () {
    return {
      selected: [],
      selecting: [],
      days: WEEK_DAYS.length,
      currentLine: false
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
    },
    start () {
      return this.times[this.active[0]].split('-')[0].trim();
    },
    stop () {
      return this.times[this.active[this.active.length - 1]].split('-')[1].trim();
    }
  },
  methods: {
    selectedGetter (e) { return this.selected; },
    selectedSetter (v) {
      this.selected = v;
      if (!this.active.length) {
        return false;
      }

      this.$store.commit('settings/showModal', {
        start: this.start,
        stop: this.stop
      });
      this.currentLine = true;
    },
    selectingSetter (v) {
      this.selecting = v;
    },
    deleteTask (id, columnIndex) {
      this.$store.commit('tasks/deleteTask', {
        id, columnIndex
      });
    }
  },
  mounted () {
    this.$nextTick(() => selectable.setSelectableItems(this.$refs.column, `.item${this.columnIndex}`));
    eventBus.$on('add-task', ({ taskName, taskDescription }) => {
      if (!this.currentLine) return false;
      const selected = Array.from(this.$refs.column.querySelectorAll('.selected'));
      let height = selected.reduce((acc, curr) => {
        return parseFloat(getComputedStyle(curr).height) + acc;
      }, 0);
      const data = {
        taskName,
        taskDescription,
        start: this.start,
        stop: this.stop
      };
      this.$store.commit('tasks/addTask', {
        active: this.active,
        columnIndex: this.columnIndex,
        data,
        height
      });
      this.currentLine = false;
    })
  },
  watch: {
    times () {
      this.$nextTick(() => selectable.setSelectableItems(this.$refs.column, `.item${this.columnIndex}`));
    }
  }
}
</script>

<style lang="scss">

.column {
  width: $columnWidth;
  position: relative;
}

.item__close {
  display: block;
  position: absolute;
  font-size: 0;
  right: 5px;
  top: 5px;
  width: 15px;
  height: 15px;
  background: url('../assets/images/close.svg') no-repeat 50% 50% transparent;
  background-size: cover;
  cursor: pointer;
}

.item__time {
  padding-left: 20px;
  background: url('../assets/images/clock.svg') no-repeat 0% 50%;
  background-size: contain;
  margin-bottom: 5px;
}
.item__description {
  font-size: 12px;
  margin-top: 5px;
}

.selectbox {
  position: absolute;
  border: 1px dotted #000;
  z-index: 10;
  top: 0;
  left: 0;
  cursor: default;
  display: none;
}

.column {
  .ps {
    overflow-y: scroll;
    .ps__thumb-y, .ps .ps__rail-y:hover > .ps__thumb-y, .ps .ps__rail-y:focus > .ps__thumb-y, .ps .ps__rail-y.ps--clicking .ps__thumb-y {
      background-color: $mainBg;
      width: 3px;
    }
    .ps__rail-y {
      background: transparent;
    }
  }
}

</style>
