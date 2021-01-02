import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SetElement from "./SetElement";
import "./../index";

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
    fontSize: 16,
    fontFamily: "Quicksand", //"Noto Sans SC",
    color: "#949494",
  },
  highlightedText: {
    fontSize: 16,
    color: "#fc3903",
  },
}));

/**
 * Selection Box Component which allow users to select different groups and sets for practice
 * @param {func} props.handleClick       handles group selection
 * @param {func} props.selectSet         handles set selection
 * @param {number} props.open            opened group
 * @param {number} props.page            current page
 * @param {number} props.index           group number
 */
export default function GroupbarElement(props) {
  const { handleClick, selectSet, open, page, index } = props;
  const [openSet, setOpenSet] = React.useState(new Array(5).fill(0));
  const classes = useStyles();

  //Open selected group and display the sets under it for practice selection
  const handleOpenSet = (index) => {
    const temp = new Array(5).fill(0);
    temp[index] = 1;
    setOpenSet(temp);
  };

  //Close sets under the selected group when it closes
  React.useEffect(() => {
    if (!open) {
      setOpenSet(new Array(5).fill(0));
    }
  }, [open]);

  return (
    <div>
      <ListItem button onClick={() => handleClick(index)}>
        <ListItemText
          classes={{
            primary: open ? classes.highlightedText : classes.listItemText,
          }}
          primary={"Group " + (index + 1 + 5 * page).toString()} //groups displayed corresponds to page number
        />
        {open ? (
          <ExpandLess style={{ fill: "#fc3903" }} />
        ) : (
          <ExpandMore style={{ fill: "#949494" }} />
        )}
      </ListItem>

      {openSet.map((_, set) => (
        <SetElement
          open={open}
          page={page}
          openSet={openSet}
          handleOpenSet={handleOpenSet}
          set={set}
          group={index}
          selectSet={selectSet}
        />
      ))}
    </div>
  );
}
