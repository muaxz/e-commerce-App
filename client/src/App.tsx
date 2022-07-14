import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import HomePage from "./pages/Home"
import CartPage from "./pages/DisplayCart"
import Layout from "./layout/layout"
import './App.css';
import {ApolloClient,ApolloProvider,InMemoryCache,HttpLink,from, DefaultOptions} from "@apollo/client"
import {onError} from "@apollo/client/link/error"

const errorLink = onError(({graphQLErrors,networkError})=>{
    if(graphQLErrors){
      console.log("error")
    }
})

const link = from([
  errorLink,
  new HttpLink({uri:"http://localhost:3001/graphql"})
])

const defaultOptions : DefaultOptions= {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
cache: new InMemoryCache(),
link: link,
defaultOptions:defaultOptions
})

function App() {
  return (
      <>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Layout/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
            </Routes>
          </ApolloProvider>
        </BrowserRouter>
      </>
  );
}

export default App;
