<template>
      <!-- <div class="modal" v-if="showModal">
        <input v-model="focusValue" type="text" placeholder="Введите значение">
        <button @click="setFocus">Сохранить</button>
      </div> -->

        <Container @drop="onDrop" orientation="horizontal" behaviour="contain" tag="tr">
          <td>Примечание</td>
          <Draggable v-for="(focus, index) in focuses" :key="focus.id" tag="td">
            <div @click="editValue(index)" class="draggable-item-horizontal">
              {{ focus.data }}
            </div>
          </Draggable>
        </Container>
</template>

<script>
import { mapState } from 'vuex';
import { Container, Draggable } from 'vue-smooth-dnd';

export default {
  name: 'Focuses',
  components: {
    Container,
    Draggable
  },
  data () {
    return {
      editId: null,
      focusValue: null,
      showModal: false
    }
  },
  computed: {
    ...mapState('focuses', ['focuses'])
  },
  methods: {
    onDrop (dropResult) {
      this.$store.commit('focuses/dragFocus', dropResult);
    },
    editValue (id) {
      this.editId = id;
      this.showModal = true;
    },
    setFocus () {
      this.$store.commit('focuses/setFocus', {
        id: this.editId,
        value: this.focusValue
      });
      this.showModal = false;
      this.focusValue = null;
    }
  }

}
</script>

<style lang="scss">
.draggable-item-horizontal {
  cursor: pointer;
}

.smooth-dnd-container {
  &.horizontal {
    display: table-row;
  }
}
</style>
