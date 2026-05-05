import { useState } from "react"


export default function Clock(){
  const [hours, setHours] = useState(21);
  const [minutes, setMinutes] = useState(30);

  function changeHour(newHours){
    if (newHours >= 24){
      setHours(0);
    }
    else if (newHours < 0){
      setHours(23);
    }
    else {
      setHours(newHours);
    }
  }

  function changeMinutes(newMinutes){
    if (newMinutes >= 60){
      setMinutes(0);
      changeHour(hours + 1)
    }
    else if (newMinutes < 0){
      setMinutes(59);
    }
    else {
      setMinutes(newMinutes);
    }
  }
  
  return (<div>
    <ClockDisplay hours={hours} minutes={minutes}/>
    <ClockControls hours={hours} setHours={changeHour} 
      minutes={minutes} setMinutes={changeMinutes}/>
  </div>)

}

function ClockDisplay({hours, minutes}){

  return (<>
    <div>
      <h1 style={{ color: "green", background: "black"}}>{hours}:{minutes}</h1>
    </div>
  </>)
}

function ClockControls(props){

  

  return (<div>
    <input type="number" placeholder="Hora" 
      value={props.hours.toString()} onChange={(e) => props.setHours(parseInt(e.target.value))} />:
    <input type="number"  placeholder="Minutos"
      value={props.minutes.toString()} onChange={(e) => props.setMinutes(parseInt(e.target.value))}/>
  </div>)
}