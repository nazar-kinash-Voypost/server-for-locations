import { IResolvers } from "graphql-tools";

const tripsResolver = require("./Trips/Trips");

const resolvers: IResolvers[] = [tripsResolver];

export default resolvers;
