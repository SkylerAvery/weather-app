import { getCityData } from "@/app/api/search/citySearch";

describe("getCityData", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("handles API error gracefully", async () => {
    // Mock geocoding success, forecast error
    (fetch as jest.Mock)
      // First call: geocoding
      .mockResolvedValueOnce({
        json: async () => ({
          results: [
            {
              id: 1,
              name: "Testville",
              country: "Testland",
              country_code: "TL",
              admin1: "Test Admin",
              latitude: 50,
              longitude: 0,
            },
          ],
        }),
      })
      // Second call: forecast
      .mockResolvedValueOnce({
        json: async () => ({
          error: true,
          reason: "Internal server error",
        }),
      });

    const result = await getCityData("Testville");
    expect(result.error).toBe(true);
    expect(result.reason).toBe("Internal server error");
    expect(result.geoData).toEqual({
      id: 1,
      name: "Testville",
      country: "Testland",
      country_code: "TL",
      admin1: "Test Admin",
      latitude: 50,
      longitude: 0,
    });
    expect(result.error).toBe(true); // Result also exposes top-level error
  });

  it("handles when API returns no known city", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: undefined }),
    });

    const result = await getCityData("Unknownville");
    expect(result.geoData).toBeNull();
    expect(result.forecast).toBeNull();
    expect(result.error).toBe(false); // Not an error at the request level
    expect(result.reason).toBeNull();
  });

  it("handles valid Brighton/GB city forecast", async () => {
    // First call: geocoding API
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => ({
          results: [
            {
              id: 2,
              name: "Brighton",
              country: "United Kingdom",
              country_code: "GB",
              admin1: "England",
              latitude: 50.8225,
              longitude: -0.1372,
            },
          ],
        }),
      })
      // Second call: forecast API
      .mockResolvedValueOnce({
        json: async () => ({
          temperature: 16,
          weather_code: 1,
          wind_speed: 8,
        }),
      });

    const result = await getCityData("Brighton", "GB");
    expect(result.forecast?.data).toEqual({
      temperature: 16,
      weather_code: 1,
      wind_speed: 8,
    });
    expect(result.forecast?.error).toBe(false);
    expect(result.forecast?.reason).toBeNull();
    expect(result.geoData).toEqual({
      id: 2,
      name: "Brighton",
      country: "United Kingdom",
      country_code: "GB",
      admin1: "England",
      latitude: 50.8225,
      longitude: -0.1372,
    });
    expect(result.error).toBe(false);
    expect(result.reason).toBeNull();
  });
});