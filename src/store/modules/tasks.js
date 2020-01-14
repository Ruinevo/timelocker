import { INITIAL_TIME } from '@/constants.js';
import { getTimes, getTasks } from '@/utils.js';

const times = getTimes(INITIAL_TIME);

const tasks = getTasks(times.length);

const state = {
  times,
  tasks
};
const mutations = {
  addTask (state, { active, columnIndex, data }) {
    const [first, ...other] = active;
    const line = state.tasks[columnIndex];
    const task = line[first];
    task.data = data;
    task.hidden = [];
    other.forEach(item => {
      task.hidden.push(item);
      line[item].show = false;
    });
  },
  deleteTask (state, { id, columnIndex }) {
    const line = state.tasks[columnIndex];
    const task = line.find(item => item.id === id);
    task.hidden.forEach(item => {
      line[item].show = true;
    });
    task.height = '60px';
    task.data = {};
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
