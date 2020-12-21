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
    const classes = useStyles();

    const [chinese, setChinese] = React.useState({chinese:[]});
    
    const handleClick = () => {
        
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
           
            setSelectedCharacter((selectedCharacter + 1 < chinese.chinese.length ) ? selectedCharacter + 1 : 0);
            handleClick();

            setInputValue("");
            setDivList([]);
            console.log(chinese.chinese[selectedCharacter].character);
         }
    };
    
    useEffect(() => {
        if (inputValue){
            const filtered = (chinese.chinese.filter(el => el.pinyinWithoutTone === inputValue));
            const divList = []
            for (var i = 0 ; i < filtered.length ; i++){
                divList.push(<div>{(filtered[i].character + ": " + filtered[i].meaning)}</div>);
            }
            setDivList(divList);
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
            
        </div>
    );
}

