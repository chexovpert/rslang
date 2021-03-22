import { render, screen } from "@testing-library/react";
import PageComponents from "./js/pages/PageComponents";

test("renders learn react link", () => {
  render(<PageComponents />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
