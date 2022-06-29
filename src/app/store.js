import {isEqual} from 'lodash'
import { configureStore, createSelector } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

let i = 1;

let prevLoli = null;
store.subscribe(() => {
  let num = i++;
  console.group('Handler ' + num)




  const loli = createLoliObject(store.getState())

  if (!prevLoli) {
    console.log(`Exit handler - prev loli not initialized`)
  }
  else if (isEqual(loli, prevLoli)) {
    console.log(`Exit handler - loli is the same (${loli === prevLoli ? 'same' : 'different'} reference)`)
  }
  else {
    console.log('Do the thing, 🥳 loli has changed')
    console.table([{name: 'loli', ...loli}, {name: 'prevLoli', ...prevLoli}])
  }

  prevLoli = loli;



  console.groupEnd('Handler ' + num)
})

const getValue = ({counter: {value}}) => value

const createLoliObject = createSelector(
  [getValue],
  (value) => {
    console.log('running calculation...')

    return {
      'Divisibile by 2': value % 2 === 0,
      'Divisibile by 3': value % 3 === 0,
      'Divisibile by 5': value % 5 === 0,
    }
  }
)