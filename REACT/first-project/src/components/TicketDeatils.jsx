import { useState } from "react";

function TicketDetails(props) {

  const [used, setUsed] = useState('No');

  function clickOnUseButton(){
    setUsed('Yes');
  }

  return (
    <div>
      <h1>Ticket Details</h1>
      <h3>USED: {used}</h3>
      <p>Name: {props.name}</p>
      <p>Gender: {props.gender}</p>
      <p>Seat: {props.seat}</p>
      <p>Destination: {props.destination}</p>
      <button onClick={clickOnUseButton}>Usar</button>
    </div>
  );
}
export default TicketDetails;

/* class TicketDetails extends React.Component {
  
  render(){
    return (
      <div>
        <h1>Ticket Details</h1>
        <p>Name: {this.props.name}</p>
        <p>Gender: {this.props.gender}</p>
        <p>Seat: {this.props.seat}</p>
      </div>
    );
  }
}

export default TicketDetails; */


