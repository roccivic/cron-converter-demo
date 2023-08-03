import { arrayToString, getSchedule, stringToArray, Schedule } from "cron-converter";
import { createSlice } from "@reduxjs/toolkit";
import { CronState, ValuePayload } from "./types";
import { DateTime } from "luxon";
import { PayloadAction } from "@reduxjs/toolkit";

const updateSchedule = (state: CronState) => {
  const schedule : Schedule = getSchedule(state.array);
  state.next = schedule.next().toLocaleString(DateTime.DATETIME_FULL);
  state.prev = schedule.prev().toLocaleString(DateTime.DATETIME_FULL);
  return state;
};

export const getInitialState = () => {
  const expression = "*/15 0-11 1,10,20 * *";
  const array = stringToArray(expression);
  return updateSchedule({
    expression,
    array,
    error: "",
    prev: "",
    next: "",
  });
};

export const slice = createSlice({
  name: "cron",
  initialState: getInitialState(),
  reducers: {
    SET_EXPRESSION: (state, action: PayloadAction<string>) => {
      state.error = "";
      state.expression = action.payload;
      try {
        state.array = stringToArray(action.payload);
        updateSchedule(state);
      } catch (e: any) {
        state.error = e.message;
      }
    },
    SET_VALUE: (state, action: PayloadAction<ValuePayload>) => {
      state.error = "";
      state.array[action.payload.index] = action.payload.values;
      try {
        const expression = arrayToString(state.array);
        state.expression = expression;
        updateSchedule(state);
      } catch (e: any) {
        state.error = e.message;
      }
    },
  },
});

export const { SET_EXPRESSION, SET_VALUE } = slice.actions;

export default slice.reducer;
