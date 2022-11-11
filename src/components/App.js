import React, {useState, useEffect} from 'react';

function App() {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [flag , setFlag] =  useState(false);
  const [worksecond, setWorkSecond] = useState(1500);
  const [breaksecond, setBreakSecond] = useState(300);
  const [type, setType] = useState('work');
  const [resetFlag, setResetFalg] = useState(true);

  useEffect(() =>{
    if(flag && type === 'work'){
      if(worksecond > 0) {
        const timer = setTimeout(() => setWorkSecond(worksecond - 1), 1000);
        return () => clearTimeout(timer);
      }
      if(worksecond === 0) {
        alert('work duration is over')
        setType('break');
        setWorkSecond(workDuration * 60);
      }
    }
    if(flag && type === 'break'){
      if(breaksecond > 0) {
        const timer = setTimeout(() => setBreakSecond(breaksecond - 1), 1000);
        return () => clearTimeout(timer);
      }
      if(breaksecond === 0) {
        alert('break duration is over');
        setType('work');
        setBreakSecond(breakDuration * 60);
      }
    }
  },[flag, type, worksecond, breaksecond, workDuration, breakDuration]);

  const reset = () =>{
      setResetFalg(true);
      setFlag(false);
      setType('work');
      setWorkDuration(25);
      setBreakDuration(5);
      setBreakSecond(300);
      setWorkSecond(1500);
  }

  const convertToStandardFormat = (sec) =>{
    let m = parseInt(sec / 60).toString();
    let s = parseInt(sec % 60).toString();
    if(m.length === 1) m = '0' + m;
    if(s.length === 1) s = '0' + s;
    return m + ":" + s;
  }
  
  const validateData = (data) =>{
    if(!isNaN(data) && parseInt(data) >= 0){
      return parseInt(data);
    }
    else
      return '';
  }
  const setDuration = (e) =>{
    e.preventDefault();
    if(breakDuration + workDuration <= 0){
      reset();
      return ;
    }
    setResetFalg(false);
    setType('work');
    setWorkSecond(workDuration * 60);
    setBreakSecond(breakDuration * 60);
  }
  return (
    <div className="App" style={{textAlign: "center"}}>
      <div className='clock'>
      <h1 className='timer'>{(type === 'work') ? convertToStandardFormat(worksecond): convertToStandardFormat(breaksecond) }</h1>
      <h3>{(type === 'work') ? 'Work' : 'Break'}-Time</h3>
      </div>
      <div className='control'>
      <button data-testid='start-btn' key='start' onClick={() => {setFlag(true); setResetFalg(false)}} disabled={flag} >start</button>
      <button data-testid='stop-btn' key='stop' onClick={() => {setFlag(false); setResetFalg(false)}} disabled={!flag}>Stop</button>
      <button data-testid='reset-btn' key='reset' onClick={() => {reset()}} disabled={resetFlag}>Reset</button>
      </div>
      <br></br>
      <div className='parameters'>
        <form onSubmit={setDuration}>
        <input data-testid='work-duration' placeholder='work duration' required type='Number' value={workDuration} disabled={flag} onChange={(e) => setWorkDuration(validateData(e.target.value))}></input>
        <input data-testid='break-duration' placeholder='break duration' required type='Number' value={breakDuration} disabled={flag} onChange={(e) => setBreakDuration(validateData(e.target.value))}></input>
        <button data-testid='set-btn' type='submit' disabled={flag}>set</button>
        </form>
      </div>
      </div>
  );
}

export default App;
// import React, {Component, useEffect, useState} from "react";
// import '../styles/App.css';

// const App = () => {
//   const [getWorkDuration,setWorkDuration]=useState(25);
//   const [getBreakDuration,setBreakDuration]=useState(5);
//   const [getSecondsRecordsWork,setSecondsRecordsWork]=useState(0);
//   const [getSecondsRecordsBreak,setSecondsRecordsBreak]=useState(0);
//   const [getFlag,setFlag]=useState(false);
//   const [getType,setType]=useState("");
//   const [getWatch,stopWatch]=useState(false)

//   let result='';
//   let recordResult='';
//   useEffect(()=>{
//     if(getFlag && getType==="work"){
//       result=setTimeout(()=>{
//         setSecondsRecordsWork(getSecondsRecordsWork-1);
//       },1000)
//     }

//     if(getFlag && getType=="work" && getSecondsRecordsWork<1){
//       clearTimeout(result);
//       setType("break");
//     }

//     if(getFlag && getType==="break"){
//       recordResult=setTimeout(()=>{
//         setSecondsRecordsBreak(getSecondsRecordsBreak-1);
//       },1000)
//     }

//     if(getFlag && getType=="break" && getSecondsRecordsBreak<1){
//       clearTimeout(recordResult);
//     }
//   },[getType,getSecondsRecordsWork,getSecondsRecordsBreak,getWatch])

//   const onDurationCheck=(event)=>{
//       if(event.target.name ==='work-duration'){
//         if(parseInt(event.target.value<0)){
//           setWorkDuration('');
//         }
//         else{
//           setWorkDuration(parseInt(event.target.value))
//         }
//       }
//       else{
//         if(parseInt(event.target.value<0)){
//           setBreakDuration('');
//         }
//         else{
//           setBreakDuration(parseInt(event.target.value));
//         }
//       }
//   }

//   const onSetHandler=()=>{
//     if(getWatch){
//       stopWatch(false);
//       setFlag(true);
//       return ;
//     }
//     setFlag(true);
//     setType("work");
//     setSecondsRecordsWork(getWorkDuration*60);
//     setSecondsRecordsBreak(getBreakDuration*60);
//   }
//   const onStopHandler=()=>{
//     setFlag(false);
//     if(result){
//       clearTimeout(result);
//     }
//     if(recordResult){
//       clearTimeout(result);
//     }
//     stopWatch(true);
//   }
//   const onResetHandler=()=>{
//     setFlag(false);
//     stopWatch(false);
//     if(result){
//       clearTimeout(result);
//     }
//     if(recordResult){
//       clearTimeout(recordResult);
//     }
//     setType('');
//   }

//   const getHandlers=(value)=>{
//     let m=parseInt(value/60).toString();
//     let s=parseInt(value%60).toString();
//     let input=(m.length>1)?m:"0"+m;
//     let inputTwo=(s.length>1)?s:"0"+s;
//     return `${input}:${inputTwo}`;
//   }
//   return (
//     <div id="main">

//       <div className="container">
//         {getType ==="work" && getHandlers(getSecondsRecordsWork)}
//         {getType === "break" && getHandlers(getSecondsRecordsBreak)}
//         <br/>
//         {getType}
//       </div>

//       <div className="container">
//         <button disabled={getFlag} data-testid='start-btn'onClick={onSetHandler} >Start</button>
//         <button disabled={!getFlag} data-testid='stop-btn'onClick={onStopHandler} >Stop</button>
//         <button disabled={!getFlag} data-testid='reset-btn'onClick={onResetHandler}>Reset</button>
//       </div>

//       <div className="container">
//         <input type="number" name="work-duration" value={getWorkDuration} onChange={onDurationCheck} data-testid='work-duration' />
//         <input type="number" name="break-duration" value={getBreakDuration} onChange={onDurationCheck} data-testid='break-duration' />
//         <button disabled={getFlag} data-testid='set-btn'onClick={onSetHandler} >Set</button>
//       </div>
//     </div>
//   )
// }


// export default App;
