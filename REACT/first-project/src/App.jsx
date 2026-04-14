import './App.css'
import Welcome from './components/Welcome'
import TicketDetails from './components/TicketDeatils';
import Counter from './components/Counter';

function App() {
  const number = 55;
  function numberRangeChecker(number){
    if (number < 50){
      return 'Under 50'
    }
    else if (number >= 50 && number <= 100){
      return '50 - 100'
    }
    else {
      return 'Above 100'
    }
  }
  
  const nuno = {
    name: "Nuno",
    gender: "Male",
    seat: "17A"
  };

  const silvia = {
    name: "Silvia",
    gender: "Female",
    seat: "16A",
    age: 23,
    address: "rua das Ondas"
  }

  return (<>
    <Welcome />
    <Counter />
    <div>
      <b>Numero:</b> {number}
    </div>
    <div>
      <b>Intervalo:</b> {numberRangeChecker(number)}
    </div>
    <TicketDetails name={nuno.name} gender={nuno.gender} 
      seat={nuno.seat} destination="Lisboa"/>
    <TicketDetails name={silvia.name} gender={silvia.gender} 
      seat={silvia.seat} destination="Lisboa"/>
  </>)
}

export default App
