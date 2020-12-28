import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Groupbar from './Groupbar';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    
  },
  groupBar: {
    marginLeft: -480,
    width: 200,
    height: 300,
  },
  paper: {
    height: 140,
    width: 140,
  },
}));

export default function Practice() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [chinese, setChinese] = React.useState({chinese:[]});
  const [chineseGroup, setChineseGroup] = React.useState([[]]);

  const handleClose = () => {
    console.log(chineseGroup);
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const GroupCharacters = ( chinese ) => {
    console.log(chinese[0]);
    const result = new Array(Math.ceil(chinese[0].length / 50))
                        .fill()
                        .map(_ => chinese[0].splice(0, 50))

    const groupResult = result.map( ( _ , index ) => new Array(Math.ceil( result[index].length / 10)).fill().map(_ => result[index].splice(0,10)));
    setChineseGroup(groupResult);
    console.log(groupResult)
  };

  React.useEffect(() => {
    axios.get('http://localhost:5000/chinese/')
      .then(response => {
        setChinese([response.data])
      })
      .catch((error) => {
        console.log(error);
      })

  }, []);

  React.useEffect(() => {
    console.log(chinese);
    if (chinese.length){
        GroupCharacters(chinese);
    };

  }, [chinese]);
  return (
    <div>
       <Grid container className={classes.groupBar} spacing={2}>
            <Grid item xs={12}>
                <Groupbar/>
            </Grid>
        </Grid>
    </div>
  );
}


