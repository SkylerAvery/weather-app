import { render, screen } from "@testing-library/react";
import FavoritesPage from "@/app/favorites/page";
import Home from "@/app/page";
import WeatherCityPage from "@/app/weather/[city]/page";

describe("Route page smoke tests", () => {
  it("renders the home page content", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Search forecasts by city" }),
    ).toBeInTheDocument();
  });

  it("renders the favorites page content", () => {
    render(<FavoritesPage />);
    expect(
      screen.getByRole("heading", { name: "Favorite cities" }),
    ).toBeInTheDocument();
  });

  it("renders a valid weather city route", async () => {
    const weatherPage = await WeatherCityPage({
      params: Promise.resolve({ city: "london" }),
    });
    render(weatherPage);
    expect(
      screen.getByRole("heading", { name: "London forecast" }),
    ).toBeInTheDocument();
  });
});
