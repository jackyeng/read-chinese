import React from 'react'
import './../index.css';

export default function About(){

    return(
        <div className="about">
            <b className="redtitle">Welcome to Read Chinese!</b> 
            <br/>
            Created to assist people who are fluent(less effective for non-fluent) but illiterate in Chinese.
            <br/> <br/> 
            <b className="redtitle">It includes the following 2 main sections:-</b>
            <br/>
            <b className="redtitle">Practice:</b> Consists of 1500 chinese characters which helps user recognize and read chinese characters
            through rote-learning.<br/>
            <b className="redtitle">Typer:</b> Assist users in typing chinese by accepting pinyin input and displaying a corresponding list of words and its meaning to select from.

        </div>
    )

};


