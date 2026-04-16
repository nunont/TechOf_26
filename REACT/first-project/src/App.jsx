import './App.css'
import Welcome from './components/Welcome'
import TicketDetails from './components/TicketDeatils';
import Counter from './components/Counter';
import UserDetails from './components/UserDetails';
import WeatherControl from './components/WeatherControl';
import MovieDisplay from './components/MovieDisplay';
import Menu from './components/Menu';

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

  const movies = [
    {
      name: "Lord of The Rings",
      year: 2001,
      genre: "Fantasy",
      photo: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg"
    },
    {
      name: "The Matrix",
      year: 1999,
      genre: "Sci-Fi",
      photo: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg"
    },
    {
      name: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      photo: "https://m.media-amazon.com/images/I/51s%2Bq%2B%2B8oL._AC_.jpg"
    },
    {
      name: "The Dark Knight",
      year: 2008,
      genre: "Action",
      photo: "https://m.media-amazon.com/images/I/51EbJjlLJGL._AC_.jpg"
    },
    {
      name: "Interstellar",
      year: 2014,
      genre: "Sci-Fi",
      photo: "https://m.media-amazon.com/images/I/71n58l%2B%2B%2BL._AC_SY679_.jpg"
    }
  ]

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
    <UserDetails />
    <WeatherControl />

    {movies.map((movie) => 
      <MovieDisplay movie={movie} />
    )}

    <Menu />

  </>)
}

export default App
