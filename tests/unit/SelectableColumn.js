import { mount } from '@vue/test-utils';
import SelectableColumn from '@/components/SelectableColumn.vue';

const wrapper = mount(SelectableColumn)

// Вы можете получить доступ к экземпляру Vue через `wrapper.vm`
const { vm } = wrapper;

// Чтобы изучить wrapper подробнее, просто выведите его в консоль
// и ваши приключения с `vue-test-utils` начнутся
console.log(wrapper)
