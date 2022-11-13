import { render } from "@testing-library/react";
import { App } from "./App";

test("<App />", () => {
  const comp = render(<App />);
  expect(comp.container).toMatchSnapshot();
});
