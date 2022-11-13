import { render, screen } from "@testing-library/react";
import { Schedule } from "./Schedule";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

const useSelectorMock = useSelector as jest.MockedFunction<typeof useSelector>

test("<Schedule /> when error", () => {
  const state = { error: 'ERROR', next: '', prev: '' }
  useSelectorMock.mockImplementation(selector => selector(state))
  render(<Schedule />);
  expect(screen.getByText('ERROR')).toBeInTheDocument()
});

test("<Schedule /> when success", () => {
  const state = { error: '', next: 'NEXT', prev: 'PREV' }
  useSelectorMock.mockImplementation(selector => selector(state))
  render(<Schedule />);
  expect(screen.getByText('Would execute next at NEXT')).toBeInTheDocument()
  expect(screen.getByText('Would have last executed at PREV')).toBeInTheDocument()
});
