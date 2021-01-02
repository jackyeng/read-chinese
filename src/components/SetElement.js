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
    fontFamily: "Quicksand", //"Noto Sans SC",
    color: "#949494",
  },
  highlightedText: {
    fontSize: 14,
    color: "red",
  },
}));

/**
 * Selection Box Component which allow users to select different groups and sets for practice
 * @param {array} props.openSet          array containing the bool for other sets in the same group
 * @param {func} props.selectSet         handles set selection
 * @param {func} props.handleOpenSet     Open selected group and display the sets under it for practice selection
 * @param {number} props.open            opened group
 * @param {number} props.page            current page
 * @param {number} props.set             set number
 * @param {number} props.group           group number
 */
export default function SetElement(props) {
  const { openSet, selectSet, handleOpenSet, open, page, set, group } = props;
  const classes = useStyles();

  //Calls function & setState method from parents to perform/handle set selection
  const handleSelect = () => {
    // group is fixed at range { 0 - 4} as there are 5 groups on each page
    // Multiply the current page number by 5 and adding it to the group number to represent the group that has been selected on that page
    selectSet(group + 5 * page, set); 
    handleOpenSet(set);
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
              classes={{
                primary: openSet[set]
                  ? classes.highlightedText
                  : classes.listItemText,
              }}
              primary={"Set " + (set + 1).toString()}
            />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}
