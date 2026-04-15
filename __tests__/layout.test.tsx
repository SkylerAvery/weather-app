import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

describe("Root layout", () => {
  it("renders shared navigation links", () => {
    render(
      <RootLayout>
        <div>Child content</div>
      </RootLayout>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Favorites" })).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
