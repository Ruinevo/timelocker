
import Vue from 'vue';

import moment from 'moment';

import { uuid } from 'vue-uuid';

import { WEEK_DAYS, MINUTES_IN_DAY } from '@/constants.js';

export const isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

export const generateFocuses = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({ id: uuid.v1(), data: 123 })
  }
  return result;
}

export const eventBus = new Vue();

export const getTimes = (time, interval) => {
  const timesLength = Math.trunc(MINUTES_IN_DAY / interval);
  const [ h, m ] = time.split(':');
  const startWork = moment().set({ h, m }).format('HH:mm');
  let startInterval = startWork;
  let stopInterval;
  const result = [];
  for (let i = 0; i < timesLength; i++) {
    stopInterval = moment(startInterval, 'HH:mm').add(interval, 'minutes').format('HH:mm');
    result.push(`${startInterval} - ${stopInterval}`);
    startInterval = stopInterval;
  }
  return result;
}

export const getTasks = (timesCount) => {
  let result = [];
  for (let i = 0; i < WEEK_DAYS.length; i++) {
    let day = [];
    for (let j = 0; j < timesCount; j++) {
      day.push({
        id: uuid.v1(),
        data: '',
        show: true
      });
    }
    result.push(day);
  }
  return result;
}

export const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + ':' + minutes;
};
