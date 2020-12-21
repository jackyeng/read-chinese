import React,{useEffect} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {chinese} from './chinesedata';
import { green, red } from "@material-ui/core/colors";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '5',
      },
    
    },
    alertRoot: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    TextField: {
        color: "white",
        fontSize: "18px",
        borderColor: 'white',
    },
    underline: {
        color: 'red' ,
        '&::after': {
          border: '2px solid red'
        }
      }

  }));

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

export default function Test(){
    const [selectedCharacter, setSelectedCharacter] = React.useState(0);
    const [boolean, setBoolean] = React.useState(true);
    const [inputValue, setInputValue] = React.useState("");
    const classes = useStyles();

    const [answer, setAnswer] = React.useState([]);
    const [openCorrect, setOpenCorrect] = React.useState(false);
    const [openWrong, setOpenWrong] = React.useState(false);
    const [chinese, setChinese] = React.useState({chinese:[]});
    
    const handleClick = () => {
        handleClose();
        if (inputValue === chinese.chinese[selectedCharacter].pinyinWithoutTone){
            setOpenCorrect(true);
        }
        else {
            setOpenWrong(true);
        }
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenCorrect(false);
        setOpenWrong(false);
    };

    //Update value of input text field
    const handleChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    };
  
    //Handle users submit enter
    const handleKeyDown = (e) => {
        if (e.keyCode === 13){
            e.preventDefault();
            const previousChinese = chinese.chinese[selectedCharacter];
            setAnswer([previousChinese.pinyin, inputValue, previousChinese.character, previousChinese.meaning]);
            setSelectedCharacter((selectedCharacter + 1 < chinese.chinese.length ) ? selectedCharacter + 1 : 0);
            handleClick();

            setInputValue("");
            console.log(chinese.chinese[selectedCharacter].character);
         }
    };

    React.useEffect(() =>{ 
        axios.get('http://localhost:5000/chinese/')
      .then(response => {
        setChinese({ chinese: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
        
    }, []);
    /*React.useEffect(() => { // post chinese characters to mongodb
        var i;
        for (i = 0; i < 100; i++){
            axios.post('http://localhost:5000/chinese/add', chinese[i])
        }   
            
      }, []);*/
   
    return(
        <div>
            <h1>
                {chinese.chinese[selectedCharacter] ? chinese.chinese[selectedCharacter].character : ""}
            </h1>
            <form className={classes.root} noValidate autoComplete="off">
                <ThemeProvider theme={theme}>
                  {boolean && <TextField value={inputValue} id="standard-basic" onChange={handleChange} onKeyDown={handleKeyDown} label="" inputProps={{ underline: classes.underline, className: classes.TextField, min: 0, style: { textAlign: 'center' }}} />}
                </ThemeProvider>
            </form>
            <div className={classes.alertRoot}>
                <Snackbar anchorOrigin={{vertical:'center', horizontal:'center'}} open={openCorrect} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Correct: {answer[2]} - {answer[0]}
                        <br/>
                        Meaning: {answer[3]}
                        
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{vertical:'center', horizontal:'center'}} open={openWrong} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Your answer: {answer[1]}
                        <br/>
                        Correct answer: {answer[2]} - {answer[0]}
                        <br/>
                        Meaning: {answer[3]}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}




