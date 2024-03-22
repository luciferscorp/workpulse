
import CountDownTimer from "../../common/CountDownTimer";
import { useState } from "react";

function App() {

  let time="01:00:00"

  const hoursMinSecs = { hours: 1, minutes: 0, seconds: 0 }
  const [active, setactive] = useState(true);
  const [state, setState] = useState({})

  const callback = payload => {
    setState(payload)
    console.log("Time from callback", state)
  }

  const handleClick_save = () => {
    let data = state
    console.log("====Stored State====", data)
  }

  return (

    <div className="App">
      <h1>Hello from Parent</h1>
      <CountDownTimer
        hoursMinSecs={"01:30:20"}
        active={active}
        callback={callback}
      />
      <div>
        <button onClick={() => setactive(false)}>Pause</button>
        <button onClick={() => setactive(true)}>Play</button>
        <button onClick={() => { handleClick_save() }}>Save</button>
      </div>
    </div>
  )
}

export default App;