import { configureStore } from "@reduxjs/toolkit";

jest.mock("@reduxjs/toolkit", () => ({ configureStore: jest.fn() }));
jest.mock("./slice", () => "REDUCER");

describe("redux store", () => {
  it("should configure store", () => {
    require("./store");
    expect(configureStore).toHaveBeenCalledWith({ reducer: "REDUCER" });
  });
});
