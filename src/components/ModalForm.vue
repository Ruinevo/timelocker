<template>

  <div class="modal-wrapper" @mousedown.stop>
    <transition name="fade">
      <div class="modal" v-if="showModal">
        <h2 class="modal__title">Добавить дело</h2>
        <div class="modal__time">
          Время: {{ start}} - {{ stop }}
        </div>
        <input class="modal__name" v-model="taskName" type="text" placeholder="Название задачи">
        <textarea rows="1" class="modal__description" v-model="taskDescription" type="text" placeholder="Описание задачи"></textarea>
        <div class="modal__controls">
          <button class="modal__btn modal__add" @click="add">Добавить</button>
          <button class="modal__btn modal__clear" @click="clear">Очистить</button>
        </div>
        <button class="modal__close" @click="close">Закрыть</button>
      </div>
    </transition>
    <div v-if="showModal" class="modal-mask"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { eventBus } from '@/utils.js';

export default {
  name: 'ModalForm',
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
  text-align: center;
  .modal__close {
    display: block;
    position: absolute;
    font-size: 0;
    right: 15px;
    top: 15px;
    width: 20px;
    height: 20px;
    background: url('../assets/images/close-m.svg') no-repeat 50% 50% transparent;
    background-size: cover;
    cursor: pointer;
  }
  .modal__title {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .modal__time {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .modal__name,
  .modal__description {
    display: block;
    padding: 10px;
    width: 100%;
    border: none;
    outline: none;
    font-family: 'BloggerSans', cursive;
    margin-bottom: 10px;
    transition: $transition;
    border-radius: 2px;
    &::placeholder {
      font-family: 'BloggerSans', cursive;
    }
    &:hover {
      background: lighten($primary, 20%);
      color: $secondaryBg;
      &::placeholder {
        color: $secondaryBg;
      }
    }
  }
  .modal__description {
    resize: none;
  }
  .modal__btn {
    padding: 10px;
    border: none;
    border: 1px solid $primary;
    color: $mainFont;
    transition: $transition;
    font-family: 'BloggerSans', cursive;
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  .modal__controls {
    margin-top: 20px;
  }
  .modal__add {
    background: $primaryGradient;
    color: $secondaryFont;
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
