import { useForm } from "react-hook-form";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import ThemeToggle from "./screens/ThemeToggle";
import SignUp from "./screens/SignUp";

import NotFound from "./screens/NotFound";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { client } from "./apollo";
import { ApolloProvider } from "@apollo/client";

function App() {
  //fro testing
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Routes>
              {/* 매치되는 것 하나만 보내줌 */}
              <Route
                path={routes.home}
                element={<>{isLoggedIn ? <Home /> : <Login />}</>}
              />
              <Route
                path={routes.signUp}
                element={!isLoggedIn ? <SignUp /> : null}
              />
              {/* 모두 매치 안되면 여기에서 매칭 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
