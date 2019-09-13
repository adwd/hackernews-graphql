import ApolloClient from 'apollo-boost';

const uri =
  process.env.NODE_ENV === 'production'
    ? '/query'
    : 'http://localhost:8080/query';

export const client = new ApolloClient({
  uri,
});
