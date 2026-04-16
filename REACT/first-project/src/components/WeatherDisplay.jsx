
const WeatherDisplay = ({ weather }) => {
    return (<>
      { weather == 'sunny' && <p>There is sun outside!</p>}
      { weather == 'raining' && <p>There is rain outside!</p>}
      { weather == 'snowing' && <p>There is snow outside!</p>}
    </>)
  }

export default WeatherDisplay;