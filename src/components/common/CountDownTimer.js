import React, { useState, useEffect } from 'react'
import { BaseUrl } from '../env/baseurl';


const CountDownTimer = ({ hoursMinSecs = "00:00:00", active, callback }) => {

    let parsedIntTime = hoursMinSecs.split(":").map((e) => (parseInt(e)))
    let objectTimeFormat = { hours: parsedIntTime[0], minutes: parsedIntTime[1], seconds: parsedIntTime[2] };

    const { hours = 0, minutes = 0, seconds = 60 } = objectTimeFormat;
    const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
    const [boolstate, setboolstate] = useState(true)

    const tick = () => {

        if (hrs === 0 && mins === 0 && secs === 0) {
            // reset()

            // updateTaskDurationOnly("00:00:00");
            setboolstate(false);
            // refreshPage();
            // setTime([hrs = 0, mins = 0, secs = 0]);
        }
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };

    // const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
    // console.log("Parsed hours", parseInt(hours,minutes,seconds));
    // console.log("Parsed minutes", parseInt(minutes));
    // console.log("Parsed seconds", parseInt(seconds));    
    useEffect(() => {
        const timerId = boolstate && active && setInterval(() => tick(), 1000);
        // return () => clearInterval(timerId);
        // console.log("Timer",timerId);
    });


    //`${hrs.toString().padStart(2, '0')}:
    // ${mins.toString().padStart(2, '0')}:
    // ${secs.toString().padStart(2, '0')}`==="00:00:00"?"" :"";





    callback([hrs, mins, secs].join(":"));




    //  //api put function 
    //  async function updateTaskDurationOnly(duration) {
    //     try {
    //         const TaskProjectData ={    Duration: duration  }
    //         const response = await fetch(BaseUrl + "api/updatetaskdurationonly", {
    //             method: "put",
    //             mode: "cors",
    //             cache: "no-cache",
    //             credentials: "same-origin",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             redirect: "follow",
    //             referrerPolicy: "no-referrer",
    //             body: JSON.stringify(TaskProjectData),
    //         })
    //         const data = response.json();
    //         console.log("count duration data",data );
    //         // refreshPage();
    //         // if (counter > 0) { refreshPage(); }
    //     }
    //     catch (error) { console.error("Error", error); }
    // }
    // function refreshPage() {
    //     window.location.reload();
    // }


    return (
        <div>
            <p>{
                `${hrs.toString().padStart(2, '0')}:
                 ${mins.toString().padStart(2, '0')}:
                 ${secs.toString().padStart(2, '0')}`}</p>
        </div>
    );
}

export default CountDownTimer;