<template>

  <div class="modal-wrapper" @mousedown.stop>
    <transition name="fade">
      <div class="modal" v-if="showModal">
        <h2>Добавить дело</h2>
        {{ start}} - {{ stop }}
        <input v-model="taskName" type="text" placeholder="Название задачи">
        <input v-model="taskDescription" type="text" placeholder="Описание задачи">
        <div class="modal__controls">
          <button class="modal__add" @click="add">Добавить</button>
          <button class="modal__clear" @click="clear">Очистить</button>
          <v-select :options="[1, 2, 3]"></v-select>
        </div>
        <button class="modal__close" @click="close">Закрыть</button>
      </div>
    </transition>
    <div v-if="showModal" class="modal-mask"></div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import { mapState } from 'vuex';
import { eventBus } from '@/utils.js';

export default {
  name: 'ModalForm',
  components: {
    vSelect
  },
  data () {
    return {
      taskName: '',
      taskDescription: ''
    }
  },
  computed: {
    ...mapState('settings', ['showModal', 'closeModal', 'start', 'stop'])
  },
  methods: {
    close () {
      this.$store.commit('settings/closeModal');
    },
    clear () {
      this.taskName = '';
      this.taskDescription = '';
    },
    add () {
      if (!this.taskName) return false;
      eventBus.$emit('add-task', {
        taskName: this.taskName,
        taskDescription: this.taskDescription
      });
      this.$store.commit('settings/closeModal');
      this.clear();
    }
  }
}
</script>

<style lang="scss" scoped>

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  max-height: 90%;
  max-width: 500px;
  border-radius: 4px;
  width: 100%;
  z-index: 30;
  background: $secondaryBg;
  padding: 30px;
  .modal__close {
    display: block;
    position: absolute;
    font-size: 0;
    right: 15px;
    top: 15%;
    width: 20px;
    height: 20px;
    background: url('../assets/images/close-m.svg') no-repeat 50% 50% transparent;
    background-size: cover;
    cursor: pointer;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
