
import Vue from 'vue';

import { uuid } from 'vue-uuid';

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
