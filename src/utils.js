
import Vue from 'vue';

import moment from 'moment';

import { uuid } from 'vue-uuid';

import { WEEK_DAYS } from '@/constants.js';

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
<<<<<<< HEAD
=======

export const getTimes = (time) => {
  let old = time;
  let next;
  let diff = 60;
  const result = [];
  while (next !== time) {
    next = moment(old, 'HH:mm').add(diff, 'minutes').format('HH:mm');
    result.push(`${old} - ${next}`);
    old = next;
  }
  return result;
}

export const getTasks = (timesCount) => {
  let result = [];
  let tasksLength = timesCount * WEEK_DAYS.length;
  for (let i = 0; i < tasksLength; i++) {
    result.push({
      id: uuid.v1(),
      colSpan: 1,
      rowSpan: 1,
      data: null
    });
  }
  return result;
}
>>>>>>> 97b5a724b3f0660a643d1630995318a4495e5a7a
