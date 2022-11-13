import { render } from "@testing-library/react";
import { Info } from "./Info";

test("<Info />", () => {
  const comp = render(<Info />);
  expect(comp.container).toMatchSnapshot();
});
