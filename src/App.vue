<template>
  <div id="app">
    <div class="container">
      <HeaderComponent></HeaderComponent>
      <Sidebar></Sidebar>
    </div>
  </div>

</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  name: 'app',
  components: {
    Sidebar,
    HeaderComponent
  },
  data () {
    return {};
  }
};
</script>

<style lang="scss">
@import './assets/styles';

#app {
  display: flex;
  .container {
    flex: 1 1 auto;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
  }
}
</style>
