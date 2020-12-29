import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import GroupbarElement from "./GroupbarElement";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "transparent",
    color: "white",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    color: "white",
    fontFamily: "Noto Sans SC",
  },
}));

export default function Groupbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState([0, 0, 0, 0, 0]);

  const { selectSet } = props;
  const handleClick = (e) => {
    const temp = new Array(open.length)
      .fill()
      .map((_, index) => (index === e ? (open[e] ? 0 : 1) : 0));

    setOpen(temp);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <div className={classes.title}>Practice Groups</div>
        </ListSubheader>
      }
      className={classes.root}
    >
      <GroupbarElement
        open={open[0]}
        index={0}
        handleClick={handleClick}
        selectSet={selectSet}
      />
      <GroupbarElement
        open={open[1]}
        index={1}
        handleClick={handleClick}
        selectSet={selectSet}
      />
      <GroupbarElement
        open={open[2]}
        index={2}
        handleClick={handleClick}
        selectSet={selectSet}
      />
      <GroupbarElement
        open={open[3]}
        index={3}
        handleClick={handleClick}
        selectSet={selectSet}
      />
      <GroupbarElement
        open={open[4]}
        index={4}
        handleClick={handleClick}
        selectSet={selectSet}
      />
    </List>
  );
}
