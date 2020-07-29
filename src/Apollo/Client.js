
import  ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";


const token = localStorage.getItem('token');
export default new ApolloClient({
  uri: 'http://localhost:4000',
  clientState: {
    defaults,
    resolvers
  },
  headers : {
    authorization: `Bearer ${token}`
  }
});