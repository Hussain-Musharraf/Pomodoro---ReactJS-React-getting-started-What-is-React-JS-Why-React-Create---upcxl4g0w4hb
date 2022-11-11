import React, {Component, useEffect, useState} from "react";
import '../styles/App.css';

const App = () => {
  const [getWorkDuration,setWorkDuration]=useState(25);
  const [getBreakDuration,setBreakDuration]=useState(5);
  const [getSecondsRecordsWork,setSecondsRecordsWork]=useState(0);
  const [getSecondsRecordsBreak,setSecondsRecordsBreak]=useState(0);
  const [getFlag,setFlag]=useState(false);
  const [getType,setType]=useState("");
  const [getWatch,stopWatch]=useState(false)

  let result='';
  let recordResult='';
  useEffect(()=>{
    if(getFlag && getType==="work"){
      result=setTimeout(()=>{
        setSecondsRecordsWork(getSecondsRecordsWork-1);
      },1000)
    }

    if(getFlag && getType=="work" && getSecondsRecordsWork<1){
      clearTimeout(result);
      setType("break");
    }

    if(getFlag && getType==="break"){
      recordResult=setTimeout(()=>{
        setSecondsRecordsBreak(getSecondsRecordsBreak-1);
      },1000)
    }

    if(getFlag && getType=="break" && getSecondsRecordsBreak<1){
      clearTimeout(recordResult);
    }
  },[getType,getSecondsRecordsWork,getSecondsRecordsBreak,getWatch])

  const onDurationCheck=(event)=>{
      if(event.target.name ==='work-duration'){
        if(parseInt(event.target.value<0)){
          setWorkDuration('');
        }
        else{
          setWorkDuration(parseInt(event.target.value))
        }
      }
      else{
        if(parseInt(event.target.value<0)){
          setBreakDuration('');
        }
        else{
          setBreakDuration(parseInt(event.target.value));
        }
      }
  }

  const onSetHandler=()=>{
    if(getWatch){
      stopWatch(false);
      setFlag(true);
      return ;
    }
    setFlag(true);
    setType("work");
    setSecondsRecordsWork(getWorkDuration*60);
    setSecondsRecordsBreak(getBreakDuration*60);
  }
  const onStopHandler=()=>{
    setFlag(false);
    if(result){
      clearTimeout(result);
    }
    if(recordResult){
      clearTimeout(result);
    }
    stopWatch(true);
  }
  const onResetHandler=()=>{
    setFlag(false);
    stopWatch(false);
    if(result){
      clearTimeout(result);
    }
    if(recordResult){
      clearTimeout(recordResult);
    }
    setType('');
  }

  const getHandlers=(value)=>{
    let m=parseInt(value/60).toString();
    let s=parseInt(value%60).toString();
    let input=(m.length>1)?m:"0"+m;
    let inputTwo=(s.length>1)?s:"0"+s;
    return `${input}:${inputTwo}`;
  }
  return (
    <div id="main">

      <div className="container">
        {getType ==="work" && getHandlers(getSecondsRecordsWork)}
        {getType === "break" && getHandlers(getSecondsRecordsBreak)}
        <br/>
        {getType}
      </div>

      <div className="container">
        <button disabled={getFlag} data-testid='start-btn'onClick={onSetHandler} >Start</button>
        <button disabled={!getFlag} data-testid='stop-btn'onClick={onStopHandler} >Stop</button>
        <button disabled={!getFlag} data-testid='reset-btn'onClick={onResetHandler}>Reset</button>
      </div>

      <div className="container">
        <input type="number" name="work-duration" value={getWorkDuration} onChange={onDurationCheck} data-testid='work-duration' />
        <input type="number" name="break-duration" value={getBreakDuration} onChange={onDurationCheck} data-testid='break-duration' />
        <button disabled={getFlag} data-testid='set-btn'onClick={onSetHandler} >Set</button>
      </div>
    </div>
  )
}


export default App;
