import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './graphql/apollo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
