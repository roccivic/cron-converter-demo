import { render } from "@testing-library/react";
import { Parts } from "./Parts";

jest.mock('./Part', () => ({
  Part: (props: any) => <div {...props}></div>
}))

test("<Parts />", () => {
  const comp = render(<Parts />);
  expect(comp.container).toMatchSnapshot();
});
