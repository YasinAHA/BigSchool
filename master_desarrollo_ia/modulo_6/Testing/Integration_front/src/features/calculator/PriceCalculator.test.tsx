import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PriceCalculator from "./PriceCalculator";

test("calculates total correctly using userEvent", async () => {
  render(<PriceCalculator />);
  const user = userEvent.setup();

  const quantity = screen.getByLabelText(/Quantity/i) as HTMLInputElement;
  const unitPrice = screen.getByLabelText(/Unit Price/i) as HTMLInputElement;

  await user.type(quantity, "3");
  await user.type(unitPrice, "10.50");

  expect(screen.getByText(/Total: \$31.50/)).toBeTruthy();
});
