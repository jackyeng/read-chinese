import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import './../index.css';
import download from './download.jpeg';
import logo from './logo.png';

const useStyles = makeStyles((theme) => ({
    customLink: {
      '& > *': {
        margin: theme.spacing(1),
        width: '5',
      },
    
    },

  }));

export default function ActiveLastBreadcrumb() {
  const classes = useStyles;
  return (
    <Breadcrumbs separator="" aria-label="breadcrumb">
      <Link className="custom-link" color="white" href="/">
        <img className="home-logo" src={logo} alt=""></img>
      </Link>
      <Link className="custom-link" color="white" href="/practice" >
        practice
      </Link>
      <Link className="custom-link" color="white" href="/test" >
        test
      </Link>
      <Link className="custom-link" color="white" href="/typer">
        typer
      </Link>
      <Link className="custom-link" color="white" href="/characters">
        characters
      </Link>
      <Link className="custom-link" color="white" href="/about">
        about
      </Link>
    </Breadcrumbs>
  );
}