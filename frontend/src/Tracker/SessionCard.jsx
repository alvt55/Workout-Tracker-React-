import { useState, useRef, createContext, useEffect } from 'react'
import './SessionsStyles.css';


function SessionCard(props) {


    const session = props.session;

    const container = "session-container";


    // formats session cards 
    return (
        <div className={`${container} ${session.day}`}>
            <h3>{props.session.date}: {props.session.day}</h3>

            <ul>
                {session.exercises.map((e, idx) => {

                    let weight = e.weight ? " (" + e.weight + ") " : " ";

                    let exText = e.sets + "x" + e.reps + weight + e.name;
                    return <li key={idx}>{exText}</li>
                })}
            </ul>
        </div>
    )
}

export default SessionCard