import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("Not found page", () => {
  it("renders fallback messaging", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { name: "Page or city not found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to search" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
