import { IResolvers } from "graphql-tools";

interface Trip {
  id: string;
  from: string;
  to: string;
}

const trips = [
  { id: "1", from: "First Book", to: "sdf" },
  { id: "2", from: "First Book", to: "sdf" },
];

const tripsResolver: IResolvers = {
  Query: {
    trips: (): Trip[] => trips,
  },
  Mutation: {
    createTrip: (fromPlace: string, toPlase: string) => trips.push({ id: "34", from: fromPlace, to: toPlase }),
  },
};

module.exports = tripsResolver;
