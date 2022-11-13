import reducer, { getInitialState, SET_EXPRESSION, SET_VALUE } from "./slice";
import { arrayToString, stringToArray, getSchedule } from "cron-converter";
import { CronState } from "./types";

jest.mock("luxon", () => ({
  DateTime: {
    DATETIME_FULL: "DATETIME_FULL",
  },
}));

jest.mock("cron-converter", () => ({
  arrayToString: jest.fn(),
  stringToArray: jest.fn(),
  getSchedule: jest.fn(
    (arr: number[][]) =>
      ({
        next: () => ({
          toLocaleString: (fmt: any) => `NEXT(${JSON.stringify(arr)}, ${JSON.stringify(fmt)})`,
        }),
        prev: () => ({
          toLocaleString: (fmt: any) => `PREV(${JSON.stringify(arr)}, ${JSON.stringify(fmt)})`,
        }),
      } as any)
  ),
}));

const arrayToStringMock = arrayToString as jest.MockedFunction<typeof arrayToString>;
const stringToArrayMock = stringToArray as jest.MockedFunction<typeof stringToArray>;

const initialState: CronState = {
  expression: "EXPRESSION(INITIAL)",
  array: [[], [], [], [], []],
  error: "",
  prev: "PREV(INITIAL)",
  next: "NEXT(INITIAL)",
};

describe("cron slice", () => {
  it("should return initial state", () => {
    stringToArrayMock.mockImplementation(() => [[1, 2, 3]]);
    expect(getInitialState()).toEqual({
      array: [[1, 2, 3]],
      error: "",
      expression: "*/15 0-11 1,10,20 * *",
      next: "NEXT([[1,2,3]], \"DATETIME_FULL\")",
      prev: "PREV([[1,2,3]], \"DATETIME_FULL\")",
    });
  });
  it("should handle empty action", () => {
    expect(reducer(initialState, { type: "EMPTY" })).toEqual(initialState);
  });
  it("should handle SET_EXPRESSION", () => {
    stringToArrayMock.mockImplementation(() => [[1, 2, 3]]);
    expect(reducer(initialState, SET_EXPRESSION("DUMMY"))).toEqual({
      ...initialState,
      array: [[1, 2, 3]],
      expression: "DUMMY",
      next: "NEXT([[1,2,3]], \"DATETIME_FULL\")",
      prev: "PREV([[1,2,3]], \"DATETIME_FULL\")",
    });
  });
  it("should handle SET_EXPRESSION error", () => {
    stringToArrayMock.mockImplementation(() => {
      throw new Error("OOPS");
    });
    expect(reducer(initialState, SET_EXPRESSION("DUMMY"))).toEqual({
      ...initialState,
      expression: "DUMMY",
      error: "OOPS",
    });
  });
  it("should handle first SET_VALUE", () => {
    arrayToStringMock.mockImplementation((arr: number[][]) => `STRING(${JSON.stringify(arr)})`);
    expect(reducer(initialState, SET_VALUE({ index: 0, values: [1, 2, 3] }))).toEqual({
      ...initialState,
      array: [[1, 2, 3], [], [], [], []],
      expression: "STRING([[1,2,3],[],[],[],[]])",
      next: "NEXT([[1,2,3],[],[],[],[]], \"DATETIME_FULL\")",
      prev: "PREV([[1,2,3],[],[],[],[]], \"DATETIME_FULL\")",
    });
  });
  it("should handle second SET_VALUE", () => {
    arrayToStringMock.mockImplementation((arr: number[][]) => `STRING(${JSON.stringify(arr)})`);
    expect(reducer(initialState, SET_VALUE({ index: 1, values: [1, 2, 3] }))).toEqual({
      ...initialState,
      array: [[], [1, 2, 3], [], [], []],
      expression: "STRING([[],[1,2,3],[],[],[]])",
      next: "NEXT([[],[1,2,3],[],[],[]], \"DATETIME_FULL\")",
      prev: "PREV([[],[1,2,3],[],[],[]], \"DATETIME_FULL\")",
    });
  });
  it("should handle SET_VALUE error", () => {
    arrayToStringMock.mockImplementation(() => {
      throw new Error("OOPS");
    });
    expect(reducer(initialState, SET_VALUE({ index: 0, values: [1, 2, 3] }))).toEqual({
      ...initialState,
      array: [[1, 2, 3], [], [], [], []],
      error: "OOPS",
    });
  });
});
