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
import { CardInterface } from "../interfaces/card";

interface Props {
  card: CardInterface;
  toggleDrawer: (
    open: boolean,
    card?: CardInterface | undefined
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isLoading?: boolean;
}

interface LoadingProps {
  card?: never;
  toggleDrawer?: never;
  isLoading: true;
}

const PokemonCard: FC<Props | LoadingProps> = ({
  card,
  toggleDrawer,
  isLoading,
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
        <CardMedia component="img" image={card!.images.small} alt={card!.name} />
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
