function TicketDetails({ name, gender, seat }) {
  return (
    <div>
      <h1>Ticket Details</h1>
      <p>Name: {name}</p>
      <p>Gender: {gender}</p>
      <p>Seat: {seat}</p>
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


