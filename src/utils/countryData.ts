
// Geographical coordinates for each country (approximate central points)
export const countryCoordinates: Record<string, [number, number]> = {
  "Japan": [138, 36],
  "USA": [-100, 40],
  "France": [2, 46],
  "Brazil": [-55, -10],
  "Australia": [133, -25],
  "Canada": [-95, 60],
  "Germany": [10, 51],
  "India": [78, 21],
  "UK": [-2, 54],
  "South Korea": [128, 36],
  "Italy": [12, 42],
  "Spain": [-4, 40],
  "Mexico": [-102, 23],
  "Sweden": [15, 62],
  "Netherlands": [5, 52],
  "Russia": [100, 60],
  "China": [105, 35],
  "South Africa": [25, -30],
  "Egypt": [30, 27],
  "Argentina": [-65, -34]
};

// List of countries for random selection
export const countries = Object.keys(countryCoordinates);

// Function to get a random country
export const getRandomCountry = (): string => {
  return countries[Math.floor(Math.random() * countries.length)];
};
