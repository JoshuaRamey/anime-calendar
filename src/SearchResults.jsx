import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    margin: 10
  },
  title: {
    fontSize: 15
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    height: 60,
    width: 160
  },
  cover: {
    width: 160,
    height: 224
  },
  genres: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: 1,
    fontSize: 10
  },
  broadcastChip: {
    margin: 1,
    fontSize: 10,
    backgroundColor: "#0099ff",
    color: "white",
    width: 100
  }
}));

function MediaControlCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Chip
            size="small"
            label={props.broadcast}
            className={classes.broadcastChip}
          />
          <Typography className={classes.title}>{props.title}</Typography>
          {/* <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography> */}

          <div className={classes.root}>
            {props.genres.map(genre => {
              return (
                <Chip
                  size="small"
                  label={genre}
                  key={genre}
                  className={classes.chip}
                />
              );
            })}
          </div>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.cover}
        title={props.title + " cover image"}
      />
    </Card>
  );
}

export default MediaControlCard;
