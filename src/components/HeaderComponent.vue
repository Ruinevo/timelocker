<template>
  <header :class="['header', {active: active && sidebar}]" @mousedown.stop>
      <button class="header__button" @click="toggle"></button>
      <ul class="header__task task">
        <li class="task__item">
          Текущее дело:
          <span v-if="currentTask">{{ currentTask.data.taskName }}</span>
          <span v-else>Отсутствует</span>
        </li>
        <li v-if="currentTask" class="task__item">
          До конца осталось: {{ timeLeft }}
        </li>
      </ul>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'HeaderComponent',
  data () {
    return {
      interval: null
    }
  },
  computed: {
    ...mapState('settings', ['sidebar']),
    ...mapGetters('tasks', ['currentTask', 'timeLeft']),
    active () {
      return window.innerWidth > 640;
    }
  },
  methods: {
    toggle () {
      this.$store.commit('settings/toggleSidebar');
    }
  },
  mounted () {
    this.interval = setInterval(this.generateTime, 1000);
  }
}
</script>

<style lang="scss" scoped>
.header {
  transition: $transition;
  display: flex;
  align-items: center;
  &.active {
    padding-left: $sidebarWidth;
  }
  min-height: $headerHeight;
  background: $secondaryFont;
  padding-top: 20px;
  padding-bottom: 20px;
  .header__button {
    display: none;
    background: url('../assets/images/menu.svg') no-repeat 50% 50%;
    background-size: cover;
    width: 18px;
    height: 18px;
    margin-left: 20px;
    margin-right: 20px;
    @media screen and (max-width: 1200px) {
      display: block;
    }
  }
  .task {
    margin-left: 20px;
  }
}

</style>
