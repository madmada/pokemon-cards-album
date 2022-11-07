import React, { FC, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { AlertTitle, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Alert from "@mui/material/Alert";

import { CardInterface, CardsApiResponse } from "../interfaces/card";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "./PokemonCard";
import { fetchCards } from "../utils/fetchCards";
import { useSearchContext } from "../contexts/SearchContext";

const CardsGrid: FC<{ data: CardsApiResponse | null }> = ({ data }) => {
  const [cardsData, setCardsData] = useState(data);
  const initialData = data;

  const { searchValue } = useSearchContext();

  const [drawerState, setDrawerState] = React.useState<{
    open: boolean;
    card: CardInterface | null;
  }>({ open: false, card: null });

  useEffect(() => {
    if (searchValue || initialData !== cardsData) {
      fetchFiltered();
    }
  }, [searchValue]);

  if (!cardsData) {
    return (
      <Box minHeight="50vh">
        <Box display="flex" justifyContent="center" mt={14}>
          <Alert severity="error">
            <AlertTitle>No cards found</AlertTitle>
          </Alert>
        </Box>
      </Box>
    );
  }

  const { data: cards, count, totalCount, page } = cardsData;

  const fetchFiltered = async () => {
    fetchCards({ search: searchValue })
      .then((response) => setCardsData(response))
      // TODO: introduce proper error handling
      .catch((error) => console.warn(error));
  };

  const toggleDrawer =
    (open: boolean, card?: CardInterface) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerState({ open: open, card: card || null });
    };

  const handleFetchNextPage = async () => {
    fetchCards({ page: page + 1, search: searchValue })
      .then((response) => {
        setCardsData({
          page: response.page,
          count: cardsData.count + response.count,
          data: [...cardsData.data, ...response.data],
          pageSize: response.totalCount,
          totalCount: response.totalCount,
        });
      })
      .catch((error) => console.warn(error));
  };

  return (
    <>
      <InfiniteScroll
        dataLength={cards.length}
        next={handleFetchNextPage}
        hasMore={count < totalCount}
        loader={
          <Container maxWidth="lg">
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
            >
              {[1, 2, 3, 4].map((item) => (
                <Grid item key={`card-loader-${item}`} xs={10} sm={5} md={3}>
                  <PokemonCard isLoading={true} />
                </Grid>
              ))}
            </Grid>
          </Container>
        }
      >
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {cards.map((card, index) => (
              <Grid item key={card.id} xs={10} sm={5} md={3}>
                <PokemonCard card={card} toggleDrawer={toggleDrawer} hasPriority={index < 4}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>

      <Drawer
        anchor="bottom"
        open={drawerState.open}
        onClose={toggleDrawer(false)}
      >
        <Container sx={{ py: 8 }}>
          {drawerState.card ? (
            <>
              <Typography gutterBottom variant="h6">
                {drawerState.card.name}
              </Typography>

              {drawerState.card.hp && (
                <Typography>Health points: {drawerState.card.hp}</Typography>
              )}
              <Typography gutterBottom variant="h6">
                <Typography>
                  Subtypes: {drawerState.card.subtypes.join(", ")}
                </Typography>
                {drawerState.card.abilities && (
                  <Typography>
                    Abilities:{" "}
                    {drawerState.card.abilities
                      .map((ability) => ability.name)
                      .join(", ")}
                  </Typography>
                )}
                {drawerState.card.attacks && (
                  <Typography>
                    Attacks:{" "}
                    {drawerState.card.attacks
                      .map((attack) => attack.name)
                      .join(", ")}
                  </Typography>
                )}
              </Typography>
            </>
          ) : null}
        </Container>
      </Drawer>
    </>
  );
};

export default CardsGrid;
