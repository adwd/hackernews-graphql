import gql from 'graphql-tag';

const foo = gql`
  query Stories($limit: Int) {
    stories(limit: $limit) {
      id
      title
      url
    }
  }
`;
