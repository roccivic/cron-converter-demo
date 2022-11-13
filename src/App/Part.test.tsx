import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { SET_VALUE } from "../redux/slice";
import { Part } from "./Part";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const useSelectorMock = useSelector as jest.MockedFunction<typeof useSelector>;
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>;

test("<Part />", () => {
  const mockDispatch = jest.fn();
  useDispatchMock.mockImplementation(() => mockDispatch);
  const state = {
    array: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
  };
  useSelectorMock.mockImplementation((selector) => selector(state));
  render(<Part id="minute" index={1} min={0} max={9} />);
  expect(screen.getByText("minute")).toBeInTheDocument();
  expect(screen.getAllByRole("option").length).toBe(10);
  expect(
    screen
      .getAllByRole("option")
      .filter((o) => (o as HTMLOptionElement).selected)
      .map((o) => o.textContent)
  ).toEqual(["4", "5", "6"]);
  fireEvent.change(screen.getByRole("listbox"));
  expect(mockDispatch).toHaveBeenCalledWith(SET_VALUE({ index: 1, values: [4, 5, 6] }));
});
