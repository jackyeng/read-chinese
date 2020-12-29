import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

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

export default function SetElement(props) {
  const { open, set, index, selectSet } = props;
  const classes = useStyles();

  const handleSelect = () => {
    selectSet(index, set);
  };

  return (
    <div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={() => handleSelect()}
            className={classes.nested}
          >
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={"Set " + (set + 1).toString()}
            />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}
