<template>
  <div id="app">
    <div class="container">
      <HeaderComponent></HeaderComponent>
      <Sidebar></Sidebar>
      <ContentComponent></ContentComponent>
    </div>
  </div>

</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ContentComponent from '@/components/ContentComponent.vue';

export default {
  name: 'app',
  components: {
    Sidebar,
    HeaderComponent,
    ContentComponent
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
