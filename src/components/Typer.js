import React,{useEffect} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { red } from "@material-ui/core/colors";

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
    const [divList, setDivList] = React.useState([]);
    const [selectList, setSelectList] = React.useState([]);
    const [chinese, setChinese] = React.useState({chinese:[]});
    const [result, setResult] = React.useState("");
    const classes = useStyles();


    //Update value of input text field
    const handleChange = (e) => {
        e.preventDefault();
    
        setInputValue(e.target.value);
        
    };

    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

    const handleResult = (e) => {
        if (e < divList.length){
            setResult(result + selectList[e]);
            setInputValue("");
        }

    };

    //Handle users submit enter
    const handleKeyDown = (e) => {
        if (isNumber(String.fromCharCode(e.keyCode)) && divList.length>0){
            handleResult(e.keyCode-48);
        }
        
        if (e.keyCode === 13){  
            e.preventDefault();
           
            setSelectedCharacter((selectedCharacter + 1 < chinese.chinese.length ) ? selectedCharacter + 1 : 0);

            setInputValue("");
            setDivList([]);
         }
    };
    
    useEffect(() => {
        if (Number(inputValue)){
            setInputValue("");
        }
        
        if (inputValue){
            const filtered = (chinese.chinese.filter(el => el.pinyinWithoutTone === inputValue));
            const divList = [];
            const selectList = [];
            for (var i = 0 ; i < filtered.length ; i++){
                divList.push(<div>{String(i) + ") " + (filtered[i].character + ": " + filtered[i].meaning)}</div>);
                selectList.push(filtered[i].character);
            }
            setDivList(divList);
            setSelectList(selectList);
        }
        
      }, [inputValue]);

    React.useEffect(() =>{ 
        axios.get('http://localhost:5000/chinese/')
      .then(response => {
        setChinese({ chinese: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
        
    }, []);
   
   
    return(
        <div>
            <h1>
                {divList}
            </h1>
            <form className={classes.root} noValidate autoComplete="off">
                <ThemeProvider theme={theme}>
                  {boolean && <TextField value={inputValue} id="standard-basic" onChange={handleChange} onKeyDown={handleKeyDown} label="" inputProps={{ underline: classes.underline, className: classes.TextField, min: 0, style: { textAlign: 'center' }}} />}
                </ThemeProvider>
            </form>
            <h1>
                {result}
            </h1>
        </div>
    );
}

