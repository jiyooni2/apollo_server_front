import {
  makeVar,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const TOKEN = "token";

//reactive variables, use after import
//새로고침해도 저장될 수 있도록, 초기값을 localStorage.getItem(TOKEN)으로 저장
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

export const darkModeVar = makeVar(false);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
