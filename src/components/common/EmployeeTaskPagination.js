import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/TaskPagination.css';
import { BaseUrl } from '../env/baseurl';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import CountDownTimer from "../common/CountDownTimer.js";

function getItemFromLocal(localData) {
    let form_data = JSON.parse(localStorage.getItem(localData));
    return form_data;
}

const EmployeeTaskPagination = () => {

    let local_data = getItemFromLocal("user_local");
    const projectleaderData = { EmployeeID: 5 }
    // console.log("projectleaderData",projectleaderData);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setdata] = useState([]);
    const [records, setrecords] = useState([]);
    const [totalPage, settotalPage] = useState();
    const [numbers, setnumbers] = useState([]);
    const [Companies, setCompanies] = useState();
    const recordPerPage = 5;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const [GETtaskID, setGETtaskID] = useState([])
    const [activeProjectId, setactiveProjectId] = useState("")
    const [activeProjectName, setactiveProjectName] = useState("");
    const [activeProjectDescription, setactiveProjectDescription] = useState("");
    const [hide, setHide] = useState(false);
    const [hideEdit, setHideEdit] = useState(new Set());
    const [counter, setcounter] = useState(0);
    const [status, setstatus] = useState('');
    const [rowExpanded, setRowExpanded] = useState({});
    const [taskTimers, setTaskTimers] = useState({});
    const [active, setactive] = useState(false);
    const [CountState, setCountState] = useState(false);
    const count = useRef(0);
    const [StartTimeString, setStartTimeString] = useState("");
    const [EndTimeString, setEndTimeString] = useState("");
    const [DifferenceTimeString, setDifferenceTimeString] = useState("");

    const startTimeRef = useRef(null);
    const endTimeRef = useRef(new Date());
    const diffTimeRef = useRef(null)

    const InitialEndTimeRef = useRef(null);
    const [activeTaskId, setactiveTaskId] = React.useState(null);
    // const [ActiveTaskId, setactiveTaskId] = useState(null);
    const activeTaskRef = useRef(null);
    const lastTimeRef = useRef(null)

    const [totalDuration, settotalDuration] = useState("initialState");

    function getCurrentTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }


    const [endTime, setendTime] = useState("00:00:00");

    function timeDifference(startTime, endTime) {
        const start = startTime.split(':').map(Number);
        const end = endTime.split(':').map(Number);
        let hoursDiff = end[0] - start[0];
        let minutesDiff = end[1] - start[1];
        let secondsDiff = end[2] - start[2];

        if (secondsDiff < 0) {
            secondsDiff += 60;
            minutesDiff--;
        }
        if (minutesDiff < 0) {
            minutesDiff += 60;
            hoursDiff--;
        }

        // Format the result to always show two digits for hours, minutes, and seconds
        return [
            hoursDiff.toString().padStart(2, '0'),
            minutesDiff.toString().padStart(2, '0'),
            secondsDiff.toString().padStart(2, '0')
        ].join(':');
    }

    function timeToSeconds(time) {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    function secondsToTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return [hours, minutes, seconds]
            .map(val => val.toString().padStart(2, '0'))
            .join(':');
    }

    //Addition of two times
    function addTimes(time1, time2) {
        const time1InSeconds = timeToSeconds(time1);
        const time2InSeconds = timeToSeconds(time2);
        const sumInSeconds = time1InSeconds + time2InSeconds;

        return secondsToTime(sumInSeconds);
    }

    //Compares two time and returns status codes
    function compareTimes(time1, time2) {
        const timeToSeconds = time => time.split(':').map(Number).reduce((acc, val, index) => acc + val * Math.pow(60, 2 - index), 0);

        const seconds1 = timeToSeconds(time1);
        const seconds2 = timeToSeconds(time2);

        if (seconds1 > seconds2) {
            return 1;
            //  return `${time1} is later than ${time2}`;
        } else if (seconds1 < seconds2) {
            return 2;
            // return `${time1} is earlier than ${time2}`;
        } else {
            return 1;
            // return `${time1} and ${time2} are the same time`;
        }
    }


    const logtime = (taskID, reset) => {
        if (activeTaskId !== null && activeTaskId === taskID) {
            clearInterval(taskTimers[activeTaskId]);
            delete taskTimers[activeTaskId];
            setactiveTaskId(taskID);
        }
        if (!active) {
            // start the timer
            setTaskTimers((prevTaskTimers) => {
                const newTaskTimers = { ...prevTaskTimers };
                if (newTaskTimers[taskID]) {
                    clearInterval(newTaskTimers[taskID]);
                } else {
                    newTaskTimers[taskID] = setInterval(() => {
                        setcounter((prevCounter) => {
                            if (prevCounter === 0) {
                                clearInterval(newTaskTimers[taskID]);
                                delete newTaskTimers[taskID];
                                return 0;
                            }
                            return prevCounter - 1;
                        });
                    }, 1000);
                }
                return newTaskTimers;
            });
        } else {
            // stop the timer
            setTaskTimers((prevTaskTimers) => {
                const newTaskTimers = { ...prevTaskTimers };
                if (newTaskTimers[taskID]) {
                    clearInterval(newTaskTimers[taskID]);
                    delete newTaskTimers[taskID];
                }
                return newTaskTimers;
            });
        }
        setactive((prevActive) => !prevActive);
    };

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function changePage(newdt) {
        setCurrentPage(newdt);
    }
    function nextPage() {
        if (currentPage !== totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }
    function refreshPage() {
        window.location.reload();
    }

    //api get function
    async function fetchData() {
        try {
            const response = await fetch(BaseUrl + "api/getSignedEmployeetasks", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(projectleaderData)
            });

            const { data, status } = await response.json();

            setdata(data);
            setrecords(data.slice(firstIndex, lastIndex));
            settotalPage(Math.ceil(data.length / recordPerPage));
            // let durationdata = data.map((item) => (item.Duration));
            // console.log("GET data", durationdata);
            // if (durationdata === "0:0:0") {
            //     refreshPage();
            //     // setCountState(false);
            // }

        }
        catch (error) { console.error("error", error); }
    }

    useEffect(() => {
        fetchData();
        setnumbers(Array.from({ length: totalPage }, (_, index) => index + 1));
        if (StartTimeString === "") {
            const StartTimeString = new Date().toTimeString().slice(0, 8);
            setStartTimeString(StartTimeString);
            startTimeRef.current = new Date();
        }
        if (EndTimeString === "") {
            const EndTimeString = new Date().toTimeString().slice(0, 8);
            setEndTimeString(EndTimeString);
        }
        if (StartTimeString !== "" && EndTimeString !== "" && DifferenceTimeString === "") {
            let parsedStartTime = StartTimeString.split(":").map((e) => (parseInt(e)));
            let objectStartTimeFormat = { hours: parsedStartTime[0], minutes: parsedStartTime[1], seconds: parsedStartTime[2] };
            // console.log("Start Time      : ", objectStartTimeFormat);

            let parsedEndTime = EndTimeString.split(":").map((e) => (parseInt(e)));
            let objectEndTimeFormat = { hours: parsedEndTime[0], minutes: parsedEndTime[1], seconds: parsedEndTime[2] };
            // console.log("End Time        : ", objectEndTimeFormat);

            let objectDifferenceTimeFormat = {
                hours: Math.abs(parsedEndTime[0] - parsedStartTime[0]),
                minutes: Math.abs(parsedEndTime[1] - parsedStartTime[1]),
                seconds: Math.abs(parsedEndTime[2] - parsedStartTime[2])
            };
            // console.log("Difference Time :", objectDifferenceTimeFormat);

            const [hours, minutes, seconds] = Object.values(objectDifferenceTimeFormat).map(time => time.toString().padStart(2, '0'));
            const saveDifferenceTimeFormat = [hours, minutes, seconds].join(':')
            setDifferenceTimeString(saveDifferenceTimeFormat);
        }
        console.log("Difference String Format :", DifferenceTimeString);
        console.log("=========================");
    }, [currentPage, totalPage, StartTimeString, EndTimeString, DifferenceTimeString]);

    async function updateTaskStartTime(starttime, taskid) {
        try {
            const TaskStartTimeData = { StartTime: starttime, TaskID: taskid }
            const response = await fetch(BaseUrl + "updateTaskStartTime", {
                method: "put",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(TaskStartTimeData),
            });
            // const data = await response.json();
            // console.log(data);
   
        }
        catch (error) { console.error("Error", error); }
    }



    async function updateTaskEndTime(endtime, diffTime, taskid) {
        try {
            const TaskEndTimeData = { EndTime: endtime, DiffTime: diffTime, TaskID: taskid }
            const response = await fetch(BaseUrl + "updateTaskEndTime", {
                method: "put",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(TaskEndTimeData),
            });
            // const data = await response.json();
            // console.log(data);
   
        }
        catch (error) { console.error("Error", error); }
    }

    async function updateTaskStatus(status, taskid) {
        try {
            const TaskStatus = { TaskStatusID: status, TaskID: taskid }
            const response = await fetch(BaseUrl + "updateTaskStatus", {
                method: "put",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(TaskStatus),
            });
            // const data = await response.json();
            // console.log(data);
       
        }
        catch (error) { console.error("Error", error); }
    }

    return (
        <>
            <div className="task-prj-bodycontainer">
                <div className='task-prj-tablecontainer'>
                    <table className="task-prj-tablecontent">
                        <thead>
                            <th className='task-prj-tablehead'>Project Name</th>
                            <th className='task-prj-tablehead'>Task Name</th>
                            <th className='task-prj-tablehead'>Description</th>
                            <th className='task-prj-tablehead'>Employee Name</th>
                            <th className='task-prj-tablehead'>Duration</th>
                            <th className='task-prj-tablehead'>Work Hours</th>
                            <th className='task-prj-tablehead'>Status</th>
                            <th className='task-prj-tablehead'>Action</th>
                        </thead>
                        <tbody className='task-prj-tablebody'>
                            {records.map((ArrayData, i) => (
                                <tr className='task-prj-tablerow' key={i}>
                                    <td className='task-prj-tabledata'>{ArrayData.ProjectName}</td>
                                    <td className='task-prj-tabledata'>{ArrayData.TaskName}</td>
                                    <td className=' task-prj-description'>{ArrayData.TaskDescription}</td>
                                    <td className='task-prj-tabledata'>{ArrayData.EmployeeName}</td>
                                    <td className='task-prj-tabledata'>{ArrayData.Duration}</td>
                                    <td className='task-prj-tabledata'>{ArrayData.DiffTime !== null ? ArrayData.DiffTime : "Not Started"}</td>
                                    <td className=' task-prj-tabledata'>
                                        {ArrayData.TaskStatusID === null ? "New Task" :
                                            ArrayData.TaskStatusID === 1 ? "In Progress" :
                                                ArrayData.TaskStatusID === 2 ? "Delayed" :
                                                    ArrayData.TaskStatusID === 3 ? "Completed" :
                                                        ArrayData.TaskStatusID === 4 ? "Delayed Completed" :
                                                            "Something wrong"}
                                    </td>

                                    <td className='task-prj-tabledata'>

                                        {!rowExpanded[ArrayData.TaskID] && (
                                            <PlayArrowIcon
                                                onClick={() => {
                                                    setRowExpanded({ ...rowExpanded, [ArrayData.TaskID]: true });
                                                    setactive(true);
                                                    logtime(ArrayData.TaskID);

                                                    setGETtaskID(ArrayData.TaskID);
                                                    startTimeRef.current = getCurrentTime();
                                                    // console.log("Play", startTimeRef.current, ArrayData.TaskID);

                                                    //Fetches obtained duration to server
                                                    updateTaskStartTime(getCurrentTime(), ArrayData.TaskID)
                                                    updateTaskStatus(compareTimes(ArrayData.Duration, ArrayData.DiffTime === null ? "00:00:00" : ArrayData.DiffTime), ArrayData.TaskID)
                                                }
                                                }
                                            />
                                        )}

                                        {rowExpanded[ArrayData.TaskID] && (
                                            <PauseIcon
                                                onClick={() => {
                                                    setactiveProjectId(ArrayData.TaskID);
                                                    setRowExpanded({ ...rowExpanded, [ArrayData.TaskID]: false });
                                                    setactive(false);
                                                    logtime(ArrayData.TaskID);

                                                    endTimeRef.current = getCurrentTime();
                                                    diffTimeRef.current = timeDifference(startTimeRef.current, endTimeRef.current);
                                                    setendTime(diffTimeRef.current)
                                                    setendTime(() => addTimes(endTime, diffTimeRef.current))
                                                    // console.log("Pause", getCurrentTime(), addTimes(endTime, addTimes(diffTimeRef.current, ArrayData.DiffTime === null ? "00:00:00" : ArrayData.DiffTime)));
                                                   
                                                    // Fetches obtained duration to server
                                                    updateTaskEndTime(getCurrentTime(), addTimes(endTime, addTimes(diffTimeRef.current, ArrayData.DiffTime === null ? "00:00:00" : ArrayData.DiffTime)), ArrayData.TaskID)
                                                    updateTaskStatus(compareTimes(ArrayData.Duration, ArrayData.DiffTime === null ? "00:00:00" : ArrayData.DiffTime), ArrayData.TaskID);
                                                   
                                                    refreshPage();
                                                }
                                                }
                                            />
                                        )}

                                        {<StopIcon
                                            onClick={() => {
                                                setactiveProjectId(ArrayData.TaskID);
                                                setCountState(true);
                                                updateTaskStatus(compareTimes(ArrayData.Duration, ArrayData.DiffTime === null ? "00:00:00" : ArrayData.DiffTime) === 1 ? 3 : 4, ArrayData.TaskID)
                                                refreshPage();
                                            }}
                                        />}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav className='task-prj-navbar'>
                    <ul className='task-prj-pagination'>
                        <li className='task-prj-page-item'>
                            <a href='#' className='task-prj-page-link' onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`task-prj-page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='task-prj-page-link' onClick={() => changePage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className='task-prj-page-item'>
                            <a href='#' className='task-prj-page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default EmployeeTaskPagination;