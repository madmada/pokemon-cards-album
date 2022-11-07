import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import { css } from "@mui/material/styles";

import Copyright from "../src/components/Copyright";
import TopBar from "../src/components/TopBar";
import { CardsApiResponse } from "../src/interfaces/card";
import CardsGrid from "../src/components/CardsGrid";
import { GET_CARDS_URL } from "../src/consts/api.consts";


export async function getServerSideProps() {
  const res = await fetch(`${GET_CARDS_URL}?pageSize=20&page=1`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return null;
  });

  const initialData: CardsApiResponse | null = res;
  return { props: { initialData } }
}

const Home: FC<{initialData: CardsApiResponse | null}> = ({ initialData }) => {
  const [mounted, setMounted] = useState(false);

  // to prevent dark mode flickering, display UI when mounted
  // @TODO: another solution which might be worth to experiment with could be CSS theme variables
  // https://mui.com/material-ui/experimental-api/css-theme-variables/overview/
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        css={css`
          min-height: 162.38px;
        `}
      ></div>
    );
  }
  return (
    <>
      <Head>
        <title>Pokemon cards</title>
        <meta name="description" content="View and search for pokemon cards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 12,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Pokemon cards album
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Browse your favorite pokemon cards!
            </Typography>
          </Container>
        </Box>
        <CardsGrid data={initialData} />
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
    </>
  );
}

export default Home;
