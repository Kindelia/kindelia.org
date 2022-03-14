import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../utils/themes";

import Head from "next/head";
import Layout from "../components/Layout";

function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    // setTheme({ ...lightTheme, ...theme })
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <>
      <Head>
        <title>Kindelia</title>
      </Head>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        {/* <button onClick={toggleTheme}>Switch Theme</button> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default App;
