import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SetElement from "./SetElement";

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
  listItemText: {
    fontSize: 14,
    fontFamily: "Noto Sans SC",
  },
  highlightedText: {
    fontSize: 14,
    color: "red",
  },
}));

export default function GroupbarElement(props) {
  const { open, handleClick, index, selectSet } = props;
  const classes = useStyles();
  
  return (
    <div>
      <ListItem button onClick={() => handleClick(index)}>
        <ListItemText
          classes={{
            primary: open ? classes.highlightedText : classes.listItemText,
          }}
          primary={"Group " + (index + 1).toString()}
        />
        {open ? <ExpandLess style={{ fill: "red" }} /> : <ExpandMore />}
      </ListItem>

      {/*Set 1*/}
      <SetElement open={open} set={0} index={index} selectSet={selectSet} />

      {/*Set 2*/}
      <SetElement open={open} set={1} index={index} selectSet={selectSet} />

      {/*Set 3*/}
      <SetElement open={open} set={2} index={index} selectSet={selectSet} />

      {/*Set 4*/}
      <SetElement open={open} set={3} index={index} selectSet={selectSet} />

      {/*Set 5*/}
      <SetElement open={open} set={4} index={index} selectSet={selectSet} />
    </div>
  );
}
