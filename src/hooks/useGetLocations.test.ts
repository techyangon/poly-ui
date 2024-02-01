import { transformLocationData } from "./useGetLocations";

test("Data is transformed correctly", () => {
  const testResponse = {
    states: [
      {
        id: 1,
        name: "State1",
        cities: [
          { id: 1, name: "City1", townships: [{ id: 1, name: "Tsp1" }] },
        ],
      },
    ],
  };
  const outcome = {
    cities: { 1: { 1: "City1" } },
    states: { 1: "State1" },
    townships: { 1: { 1: "Tsp1" } },
  };
  expect(transformLocationData(testResponse)).toStrictEqual(outcome);
});
