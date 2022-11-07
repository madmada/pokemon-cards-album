import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import { css } from "@mui/material/styles";

import Copyright from "../src/components/Copyright";
import TopBar from "../src/components/TopBar";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
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
              Browse and search for your favorite pokemon cards!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Show details</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
    </>
  );
}
