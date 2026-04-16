import ChildChild from "./ChildChild";

export default function Child({name}){


  return (<>
    <h2>-Child</h2>
    <ChildChild name={name}/>
    <ChildChild name={name}/>
    
  </>)

}