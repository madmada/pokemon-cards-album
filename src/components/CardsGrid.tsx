import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

import { CardInterface } from "../interfaces/card";
import Drawer from "@mui/material/Drawer";

const CardsGrid: FC<{ cards: CardInterface[] }> = ({ cards }) => {
  const [drawerState, setDrawerState] = React.useState<{
    open: boolean;
    card: CardInterface | null;
  }>({ open: false, card: null });

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

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {cards.map((card) => (
            <Grid item key={card.id} xs={10} sm={5} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={card.images.small}
                  alt={card.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.name}
                  </Typography>
                  <Typography>HP: {card.hp || "-"}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={toggleDrawer(true, card)}
                    aria-label={`show more details of ${card.name}`}
                  >
                    Show details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

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

              {drawerState.card.hp && <Typography>Health points: {drawerState.card.hp}</Typography>}
              <Typography gutterBottom variant="h6">
                <Typography>
                  Subtypes:{" "}
                  {drawerState.card.subtypes.join(', ')}
                </Typography>
                {drawerState.card.abilities &&
                <Typography>
                  Abilities:{" "}
                  {drawerState.card.abilities.map(ability => ability.name).join(', ')}
                </Typography>
                }
                {drawerState.card.attacks &&
                <Typography>
                  Attacks:{" "}
                  {drawerState.card.attacks.map(attack => attack.name).join(', ')}
                </Typography>
                }
              </Typography>
            </>
          ) : null}
        </Container>
      </Drawer>
    </>
  );
};

export default CardsGrid;
