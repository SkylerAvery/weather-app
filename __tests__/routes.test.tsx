import { act } from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import FavoritesPage from "@/app/favorites/page";
import WeatherCityPage from "@/app/weather/[city]/[countryCode]/page";

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

describe("Route page smoke tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();

      if (url.includes("geocoding-api.open-meteo.com")) {
        return {
          json: async () => ({
            results: [
              {
                id: 1,
                name: "London",
                country: "United Kingdom",
                country_code: "GB",
                admin1: "England",
                latitude: 51.5072,
                longitude: -0.1276,
              },
            ],
          }),
        } as Response;
      }

      if (url.includes("api.open-meteo.com/v1/forecast")) {
        return {
          json: async () => ({
            current: {
              temperature_2m: 14.6,
              weather_code: 1,
              wind_speed_10m: 10.2,
              time: "2026-04-15T10:00",
            },
            current_units: {
              temperature_2m: "C",
              wind_speed_10m: "km/h",
            },
            daily: {
              time: [
                "2026-04-15",
                "2026-04-16",
                "2026-04-17",
                "2026-04-18",
                "2026-04-19",
                "2026-04-20",
                "2026-04-21",
              ],
              weather_code: [1, 2, 3, 1, 2, 3, 1],
              temperature_2m_max: [17, 18, 19, 17, 16, 15, 14],
              temperature_2m_min: [10, 11, 12, 10, 9, 8, 7],
            },
            daily_units: {
              temperature_2m_max: "C",
            },
          }),
        } as Response;
      }

      throw new Error(`Unhandled fetch URL in test: ${url}`);
    }) as jest.Mock;
  });

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
      params: Promise.resolve({ city: "london", countryCode: "GB" }),
    });
    await act(async () => {
      render(weatherPage);
    });
    expect(
      await screen.findByRole("heading", {
        name: "London, England, United Kingdom forecast",
      }),
    ).toBeInTheDocument();
  });
});
