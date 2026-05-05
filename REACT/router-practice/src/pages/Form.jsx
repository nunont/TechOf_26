import { useRef, useState } from "react";

export default function Form(){

  const nameRef = useRef();
  const emailRef = useRef();
  const wantChipsRef = useRef();
  const specialReqRef = useRef();
  const acceptTermsRef = useRef();

  function handleOrder(){
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const wantChips = wantChipsRef.current.value;
    const specialReq = specialReqRef.current.value;
    const acceptTerms = acceptTermsRef.current.value;

    if (!name || !email || !wantChips || !specialReq || !acceptTerms){
      alert("Preenche os campos vazios")
    }
    else {
      alert(`Nome: ${name}, Email: ${email}, Com Batatas? ${wantChips ? "Sim" : "Não"}`)
    }
  }

  return (
    <div>
      <h1>Form Descontrolado</h1>
      <form onSubmit={handleOrder}>
        Nome:
        <input type="text" ref={nameRef} />
        <br />
        Email:
        <input type="email" ref={emailRef}/>
        <br />
        <select ref={wantChipsRef}>
          <option value={null} default>Do you want chips?</option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </select>
        <br />
        Observaçoes: <br />
        <textarea ref={specialReqRef}></textarea>
        <br />
        <input type="checkbox" ref={acceptTermsRef}/>
        * Eu aceito os termos e condiçoes
        <br />
        <button type="submit">Enviar Ordem</button>
      </form>
    </div>
  )
}

export function FormControled(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wantChips, setWantChips] = useState(null);
  const [specialReq, setSpecialReq] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  function handleOrder(){
    if (!name || !email || !wantChips || !specialReq || !acceptTerms){
      alert("Preenche os campos vazios")
    }
    else {
      alert(`Nome: ${name}, Email: ${email}, Com Batatas? ${wantChips ? "Sim" : "Não"}`)
    }
  }

  return (
    <div>
      <h1>Form Controlado</h1>
      <form onSubmit={handleOrder}>
        Nome:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br />
        <select value={wantChips} onChange={(e) => setWantChips(e.target.value)}>
          <option value={null} default>Do you want chips?</option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </select>
        <br />
        Observaçoes: <br />
        <textarea value={specialReq} onChange={(e) => setSpecialReq(e.target.value)}></textarea>
        <br />
        <input type="checkbox" value={acceptTerms} onChange={(e) => setAcceptTerms(e.target.value)}/>
        * Eu aceito os termos e condiçoes
        <br />
        <button type="submit">Enviar Ordem</button>
      </form>
    </div>
  )
}

export function FormSuperControled(){
  const [order, setOrder] = useState({
    name: "",
    email: "",
    wantChips: null,
    specialReq: "",
    acceptTerms: false
  });

  function handleOrder(){
    if (!order.name || !order.email || order.wantChips == null
      || !order.specialReq || !order.acceptTerms){
      alert("Preenche os campos vazios")
    }
    else {
      alert(`Nome: ${order.name}, Email: ${order.email}, Com Batatas? ${order.wantChips ? "Sim" : "Não"}`)
    }
  }

  return (
    <div>
      <h1>Form Super Controlado</h1>
      <form onSubmit={handleOrder}>
        Nome:
        <input type="text" value={order.name} 
          onChange={(e) => setOrder((o) => ({...o, name: e.target.value}))} />
        <br />
        Email:
        <input type="email" value={order.email} 
        onChange={(e) => setOrder((o) => ({...o, email: e.target.value}))}/>
        <br />
        <select value={order.wantChips} 
          onChange={(e) => setOrder((o) => ({...o, wantChips: e.target.value}))}>
          <option value={null} default>Do you want chips?</option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </select>
        <br />
        Observaçoes: <br />
        <textarea value={order.specialReq} 
          onChange={(e) => setOrder((o) => ({...o, specialReq: e.target.value}))}></textarea>
        <br />
        <input type="checkbox" value={order.acceptTerms} 
          onChange={(e) => setOrder((o) => ({...o, acceptTerms: e.target.value}))}/>
        * Eu aceito os termos e condiçoes
        <br />
        <button type="submit">Enviar Ordem</button>
      </form>
    </div>
  )
}