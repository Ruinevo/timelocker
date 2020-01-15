<template>
  <perfect-scrollbar>
    <div class="selectable">
      <Week></Week>
      <div class="selectable__wrapper" ref="wrapper">
        <div v-if="showInitialTime" ref="live" class="live" :style="{ top: `${currentTime}px` }"></div>
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
import { WEEK_DAYS, MINUTES_IN_DAY } from '@/constants.js';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
export default {
  name: 'Selectable',
  data () {
    return {
      days: WEEK_DAYS.length,
      timer: null,
      showModal: true,
      options: [1, 2, 3],
      wrapperHeight: null,
      now: null /** количество минут, прошедших с начала дня */
    };
  },
  components: {
    SelectableColumn,
    Week,
    PerfectScrollbar
  },
  computed: {
    ...mapState('tasks', ['times']),
    ...mapState('settings', ['startOfWork', 'showInitialTime', 'intervalValue']),
    currentTime () {
      return (this.now * this.wrapperHeight) / MINUTES_IN_DAY;
    }
  },
  methods: {
    getNow () {
      const currentTime = this.$moment();
      this.$store.commit('tasks/setTime', currentTime);
      this.wrapperHeight = this.$refs.wrapper.offsetHeight;
      const [ h, m ] = this.startOfWork.split(':');
      const startWork = this.$moment().set({ h, m });
      this.now = this.$moment().diff(startWork, 'minutes');
    }
  },
  mounted () {
    this.timer = setInterval(this.getNow, 1000);
    this.$refs.live.scrollIntoView();
  },
  watch: {
    intervalValue () {
      this.getNow();
    },
    startOfWork () {
      this.getNow();
    },
    currentTime (value) {
      this.$refs.live.scrollIntoView();
    }

  },
  beforeDestroy () {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss">
.selectable {
  .selectable__wrapper {
    display: flex;
    position: relative;
    .times {
      width: $columnWidth;
    }
    .live {
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      z-index: 30;
      background: red;
    }
  }
}

.ps {
  overflow-y: scroll;
  height: calc(100vh - #{$headerHeight});
  .ps__thumb-y,
  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    background-color: $primary;
  }
}
</style>
