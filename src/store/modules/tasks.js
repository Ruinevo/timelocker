import { START_OF_WORK_TIME, TASK_HEIGHT, INITIAL_INTERVAL } from '@/constants.js';
import { getTimes, getTasks } from '@/utils.js';
import moment from 'moment';

const times = getTimes(START_OF_WORK_TIME, INITIAL_INTERVAL);

const tasks = getTasks(times.length);

const state = {
  times,
  tasks,
  time: null
};

const getters = {
  currentTask (state) {
    let index = moment().day();
    if (index === 0) index = 6;
    const now = moment();
    if (!state.tasks[index]) return;
    return state.tasks[index].find(task => {
      if (task.data.stop) {
        const [ h, m ] = task.data.stop.split(':');
        const date = moment().set({ h, m, s: 0 });
        return date.isAfter(now);
      }
    })
  },
  timeLeft (state, getters) {
    if (getters.currentTask) {
      const [ h, m ] = getters.currentTask.data.stop.split(':');
      const date = moment().set({ h, m, s: 0 });
      const seconds = date.diff(state.time, 'seconds');
      return moment.utc(seconds * 1000).format('HH:mm:ss');
    }
  }
};
const mutations = {
  addTask (state, { active, columnIndex, data, height }) {
    const [first, ...other] = active;
    const line = state.tasks[columnIndex];
    const task = line[first];
    task.data = data;
    task.height = height;
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
    task.data = {};
    task.height = TASK_HEIGHT;
  },
  updateTimes (state, newTimes) {
    state.times = newTimes;
  },
  clearTasks (state, length) {
    state.tasks = getTasks(length);
  },
  setTime (state, time) {
    state.time = time;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
