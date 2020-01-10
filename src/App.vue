<template>
  <div id="app">
    <table>
      <Focuses></Focuses>
      <Week></Week>
      <Selectable></Selectable>
    </table>
  </div>
    <!-- <input type="text" placeholder="Введите количество колонок" @keyup.enter="$store.commit('settings/updateColumns', $event.target.value)"> -->

</template>

<script>
import Focuses from '@/components/Focuses.vue';
import Week from '@/components/Week.vue';
import Selectable from '@/components/Selectable.vue';

export default {
  name: 'app',
  components: {
    Focuses,
    Week,
    Selectable
  },
  data () {
    return {};
  }
};
</script>

<style lang="scss">
#app {
  width: 950px;
  margin: 0 auto;
  border: 3px solid green;
  min-height: 500px;
}
@import "./assets/styles.scss";
td {
  border: 1px solid red;
  width: 100px;
  cursor: pointer;
}

table {
  border-collapse: collapse;
  border-spacing: 0px;
}

</style>
