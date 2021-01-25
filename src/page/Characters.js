import React from "react";
import CharacterTooltip from "../components/CharacterTooltip";
import { chineseAPI } from "../helpers/chineseAPI";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  transparent: {
    backgroundColor: "transparent",
  },
  container: {
    marginLeft: -40,
    marginTop: 150,
    width: 900,
    height: 450,
  },
  display: {
    marginTop: 20,
    width: 700,
    height: 350,
  },
  title: {
    width: 500,
    height: 50,
    backgroundColor: "transparent ",
  },
  leftButton: {
    color: "#949494",
    width: 50,
    height: 50,
    backgroundColor: "transparent ",
  },
  rightButton: {
    color: "#949494",
    width: 50,
    height: 50,
    backgroundColor: "transparent ",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    color: "red",
  },
  titleColor: {
    fontSize: "20px",
    color: "#949494",
    fontFamily: "Noto Sans SC",
  },
}));

export default function Characters() {
  const [tooltip, setTooltip] = React.useState([]);
  const [tooltipGroup, setTooltipGroup] = React.useState([]);
  const [characterTooltip, setCharacterTooltip] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const classes = useStyles();

  /*handle previous button, move to the previous character groups*/
  const previous = () => {
    if (page - 1 > -1) {
      setPage(page - 1);
      setCharacterTooltip(tooltipGroup[page - 1]);
    }
  };

  /*handle next button, move to the next character groups*/
  const next = () => {
    if (page + 1 < tooltipGroup.length) {
      setPage(page + 1);
      setCharacterTooltip(tooltipGroup[page + 1]);
    }
  };

  /*calls Chinese characters from database*/
  React.useEffect(() => {
    chineseAPI().then((chinese) => {
      setTooltip(chinese.data);
    });
  }, []);

  React.useEffect(() => {
    if (tooltip.length > 0) {
      const result = new Array(tooltip.length)
        .fill(0)
        .map((_, index) => <CharacterTooltip chinese={tooltip[index]} />);
      const result1 = new Array(Math.ceil(result.length / 50))
        .fill()
        .map((_) => result.splice(0, 50));
      setTooltipGroup(result1);
      setCharacterTooltip(result1[page]);
    }
  }, [tooltip]);

  return (
    <div>
      <Grid
        item
        className={clsx(classes.container, classes.center, classes.transparent)}
      >
        {/*Parent Grid*/}
        <Grid 
          item
          container
          direction="column"
          spacing={2}
          className={classes.center}
        >
          {/*Grid container for next/previous buttons and current group display*/}
          <Grid item className={classes.title}> 
            <Grid 
              item
              xs
              container
              direction="row"
              spacing={1}
              className={classes.center}
            >
              <Grid item className={classes.leftButton}>
                <IconButton className="no-frame" onClick={() => previous()}>
                  <ArrowBackIosIcon></ArrowBackIosIcon>
                </IconButton>
              </Grid>
              <div className={classes.titleColor}>
                {"Character Group " + (page + 1).toString()}
              </div>
              <Grid item className={classes.rightButton}>
                <IconButton className="no-frame" onClick={() => next()}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/*Grid for characters display*/}
          <Grid 
            item
            className={clsx(
              classes.display,
              classes.center,
              classes.transparent
            )}
          >
            {characterTooltip.length > 0 ? (
              characterTooltip
            ) : (
              <CircularProgress className={classes.loading} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
