<template>
  <div id="app">
    <div class="container">
      <HeaderComponent></HeaderComponent>
      <Sidebar></Sidebar>
      <ContentComponent></ContentComponent>
      <ModalForm></ModalForm>
    </div>
  </div>

</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ContentComponent from '@/components/ContentComponent.vue';
import ModalForm from '@/components/ModalForm.vue';

export default {
  name: 'app',
  components: {
    Sidebar,
    HeaderComponent,
    ContentComponent,
    ModalForm
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
