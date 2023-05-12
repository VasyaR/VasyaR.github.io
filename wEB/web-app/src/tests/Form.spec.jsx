import React from "react";
import { render } from "@testing-library/react";
import { Form } from "../components/Form/Form";

describe("Form component", () => {
  test("should render the children when the modal is open", () => {
    const children = <div data-testid="test-children">Test children</div>;
    const { getByTestId } = render(
      <Form open={true} openModal={() => {}}>
        {children}
      </Form>
    );
    const testChildrenElement = getByTestId("test-children");
    expect(testChildrenElement).toBeInTheDocument();
  });

  test("should not render the children when the modal is closed", () => {
    const children = <div data-testid="test-children">Test children</div>;
    const { queryByTestId } = render(
      <Form open={false} openModal={() => {}}>
        {children}
      </Form>
    );
    const testChildrenElement = queryByTestId("test-children");
    expect(testChildrenElement).not.toBeInTheDocument();
  });
});
