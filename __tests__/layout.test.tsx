import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";
import Home from "@/app/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("Root layout", () => {
  it("renders shared navigation links", () => {
    render(
      <RootLayout>
        <Home />
      </RootLayout>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Favorites" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Search forecasts by city" })).toBeInTheDocument();
  });
});
