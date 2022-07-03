import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Redux
import store from './redux/store';
import { Provider } from 'react-redux';

//GraphQL
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpURI =
    process.env.REACT_APP_GRAPHQLENDPOINT || 'http://localhost:4000/graphql';
const clientURI = process.env.REACT_APP_GRAPHQLAPI || 'http://localhost:4000/';

const httpLink = createHttpLink({
    uri: httpURI,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    uri: clientURI,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,

    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
