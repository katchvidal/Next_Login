import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'



const httpLink = createHttpLink({
  uri: ' http://localhost:8080/graphql'
})

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('token')
  return {
      headers : {
        ...headers,
        token : token ? token : ''
          
      }
  }

});

const client = new ApolloClient({

  connectToDevTools : true,
  cache: new InMemoryCache(),
  link : authLink.concat( httpLink ),

});


export default client;
