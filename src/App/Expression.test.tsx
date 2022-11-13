import { fireEvent, render, screen } from "@testing-library/react";
import { SET_EXPRESSION } from "../redux/slice";
import { Expression } from "./Expression";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn().mockImplementation(() => "EXPRESSION"),
}));

test("<Expression />", () => {
  const comp = render(<Expression />);
  expect(comp.container).toMatchSnapshot();
  fireEvent.change(screen.getByDisplayValue("EXPRESSION"), { target: { value: "NEW_VALUE" } });
  expect(mockDispatch).toHaveBeenCalledWith(SET_EXPRESSION("NEW_VALUE"));
});
