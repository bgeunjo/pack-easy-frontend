
import  ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: process.env.NODE_ENV === "development" ? 'http://localhost:4000' : "https://packeasydb-5920ab540d.herokuapp.com",
  clientState: {
    defaults,
    resolvers
  }
});