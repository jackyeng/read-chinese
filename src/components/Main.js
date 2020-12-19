import React,{useEffect} from "react";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

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
    },

  }));



export default function Main(){
    const [selectedCharacter, setSelectedCharacter] = React.useState(0);
    const [boolean, setBoolean] = React.useState(true);
    const [inputValue, setInputValue] = React.useState("");
    const classes = useStyles();
    const characters = ['我','的','你','是','了'];
    const pinyin = ['wǒ','de','nǐ','shì','le'];
    const pinyinWithoutTone = ['wo','de','ni','shi','le'];
    const [answer, setAnswer] = React.useState([]);
    const [openCorrect, setOpenCorrect] = React.useState(false);
    const [openWrong, setOpenWrong] = React.useState(false);
    const [list,setList] = React.useState({users:[]});
    
    const handleClick = () => {
        handleClose();
        if (inputValue === pinyinWithoutTone[selectedCharacter]){
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

            setAnswer([pinyin[selectedCharacter],inputValue]);
            setSelectedCharacter((selectedCharacter + 1 < 5 ) ? selectedCharacter + 1 : 0);
            handleClick();

            setInputValue("");
            console.log(list);        }
    };

   
    return(
        <div>
            <h1>
                {characters[selectedCharacter]}
            </h1>
            <form className={classes.root} noValidate autoComplete="off">
                {boolean && <TextField value={inputValue} id="standard-basic"  onChange={handleChange} onKeyDown={handleKeyDown} label="" inputProps={{className: classes.TextField,min: 0, style: { textAlign: 'center' }}} />}
            </form>
            <div className={classes.alertRoot}>
                <Snackbar open={openCorrect} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Correct 
                    </Alert>
                </Snackbar>
                <Snackbar open={openWrong} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Correct pinyin: {answer[0]} 
                        <br/>
                        Your answer: {answer[1]}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}




