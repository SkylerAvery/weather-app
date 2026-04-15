import { CityGeoCoding } from "./geoData";

export type CitySuggestion = Pick<
  CityGeoCoding,
  "id" | "name" | "country" | "admin1" | "latitude" | "longitude" | "country_code"
> & {
  admin1: string | null;
};