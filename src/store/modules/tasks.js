import { INITIAL_TIME } from '@/constants.js';
import { getTimes, getTasks } from '@/utils.js';

const times = getTimes(INITIAL_TIME);

const tasks = getTasks(times.length);

const state = {
  times,
  tasks
};
const mutations = {
  addTask (state, { active, lineIndex, height }) {
    const [first, ...other] = active;
    const task = state.tasks[lineIndex][first];
    task.height = height;
    task.task = true;
    other.forEach(item => {
      state.tasks[lineIndex][item].show = false;
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
