import { FC } from "react";
import Typography from "@mui/material/Typography";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Skeleton,
} from "@mui/material";
import Image from "next/image";

import { CardInterface } from "../interfaces/card";

interface Props {
  card: CardInterface;
  toggleDrawer: (
    open: boolean,
    card?: CardInterface | undefined
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  hasPriority: boolean;
  isLoading?: boolean;
}

interface LoadingProps {
  card?: never;
  toggleDrawer?: never;
  hasPriority?: never;
  isLoading: true;
}

const PokemonCard: FC<Props | LoadingProps> = ({
  card,
  toggleDrawer,
  isLoading,
  hasPriority,
}) => {
  const isLoaded = toggleDrawer && card && !isLoading;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isLoaded ? (
        <CardMedia>
          <div style={{ position: "relative", width: "100%", height: "100%"}}>
            <Image
              src={card!.images.small}
              alt={card!.name}
              priority={hasPriority}
              layout="responsive"
              width={255}
              height={355}
            />
          </div>
        </CardMedia>
      ) : (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        {isLoaded ? (
          <>
            <Typography gutterBottom variant="h5" component="h2">
              {card!.name}
            </Typography>
            <Typography>HP: {card!.hp || "-"}</Typography>
          </>
        ) : (
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        )}
      </CardContent>
      <CardActions>
        {isLoaded ? (
          <Button
            size="small"
            onClick={toggleDrawer!(true, card)}
            aria-label={`show more details of ${card!.name}`}
          >
            Show details
          </Button>
        ) : (
          <Skeleton width="40%" />
        )}
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
