import { mount } from '@vue/test-utils';
import SelectableColumn from '@/components/SelectableColumn.vue';

const wrapper = mount(SelectableColumn)

const { vm } = wrapper;

console.log(wrapper);
console.log(vm)
