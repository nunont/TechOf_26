import { use, useState } from "react";
import useToggle from "../hooks/useToggle";

export default function ShowAndHide(){

  const [showP, toggleShowP] = useToggle();

  return (
    <div>
      <button onClick={() => toggleShowP()}>{ showP ? "Esconder" : "Mostrar"}</button>
      { showP ? <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Id, laborum optio quasi iure temporibus totam. Ab, 
        illum. Sunt sit officia ea distinctio error expedita 
        quia, voluptatum quos eveniet dignissimos numquam?</p> : ""}
    </div>
  )

}