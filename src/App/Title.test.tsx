import { render } from "@testing-library/react";
import { Title } from "./Title";

test("<Title />", () => {
  const comp = render(<Title />);
  expect(comp.container).toMatchSnapshot();
});
