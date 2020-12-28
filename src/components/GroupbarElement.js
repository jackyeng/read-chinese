import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'transparent',
    color: 'white',
    
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItemText: {
      fontSize: 14,
  },
  highlightedText: {
      fontSize: 14,
      color: 'red',
  }
}));

export default function GroupbarElement(props) {
   const {open, handleClick, index} = props;
  const classes = useStyles();
  console.log('hey');
  console.log(open);
  
  return (
        <div>
        <ListItem button onClick={() => handleClick(index)}>
            
        <ListItemText classes={{primary:open ? classes.highlightedText : classes.listItemText}} primary= {"Group " + (index + 1).toString()} />
        {open ? <ExpandLess style={{fill: "red"}} /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
            
            <ListItemText classes={{primary:classes.listItemText}} primary="Set 1" />
        </ListItem>
        </List>
    </Collapse>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
            
            <ListItemText classes={{primary:classes.listItemText}} primary="Set 2" />
        </ListItem>
        </List>
    </Collapse>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
            
            <ListItemText classes={{primary:classes.listItemText}} primary="Set 3" />
        </ListItem>
        </List>
    </Collapse>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
            
            <ListItemText classes={{primary:classes.listItemText}} primary="Set 4" />
        </ListItem>
        </List>
    </Collapse>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
            
            <ListItemText classes={{primary:classes.listItemText}} primary="Set 5" />
        </ListItem>
        </List>
    </Collapse>
    </div>
  );
}