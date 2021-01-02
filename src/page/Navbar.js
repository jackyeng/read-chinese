import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import "./../index.css";
import logo from "./../fonts/logo.png";


export default function ActiveLastBreadcrumb() {
  return (
    <Breadcrumbs separator="" aria-label="breadcrumb">
      <Link className="custom-links" color="white" href="/">
        <img className="home-logo" src={logo} alt=""></img>
      </Link>
      <Link className="custom-link" color="white" href="/practice">
        practice
      </Link>
      <Link className="custom-link" color="white" href="/test">
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
