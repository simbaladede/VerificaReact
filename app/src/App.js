import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  

    const [MostraRegistrazione, setMostraRegistrazione] = useState(false);
    const [MostraLogin, setMostraLogin] = useState(false);
    const [token, setToken] = useState(null);


    //attributi registrazione
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    //login
    const[usernameLogin, setUsernameLogin] = useState(null);
    const[passwordLogin, setPasswordLogin] = useState(null);

    //responseInformazioni
    const[informazioniUtente, setInformazioni] = useState("");


    //registrazione
    async function registrazione(){
      setInformazioni(""); 
      setMostraLogin("false");

      if(!MostraRegistrazione){
        setMostraRegistrazione(true);
        return
      }

      if(username=== null){
        setInformazioni("inserisci username");
        return;
      }

      if(email=== null){
        setInformazioni("inserisci l'email");
        return;
      }

      if(password=== null){
        setInformazioni("inserisci password");
        return;
      }



      const response = await fetch('http://localhost:8080/signup',
       {method:"POST",
        body : JSON.stringify({
          username : username,
          password: password,
          email: email
        })
        });

      
      const json_signup=  await response.json(); 
      if(json_signup.status === true){
        setInformazioni("successo");
      }

      else{
        setInformazioni("errore");
      }
    }





    //login


    async function login(){
      setMostraRegistrazione(false);
      setInformazioni("");

      if(!MostraLogin){
        setMostraLogin(true);
        return;
      }

      if(usernameLogin=== null){
        setInformazioni("inserisci l'username");
        return;
      }

      if(passwordLogin=== null){
        setInformazioni("inserisci password");
        return;
      }


      const response = await fetch("http://localhost:8080/login",{

          method: "POST",
          body: JSON.stringify({
            username: usernameLogin,
            password : passwordLogin,
          }),  
    });

    const json_login = await response.json();
    if(json_login.token != "") {
      setToken(json_login.token);
      setInformazioni("Hai fatto il login");
    } else{
      setToken(null);
      setInformazioni("Errore Login");
    }

  }


  //Dettagli
  async function Dettagli({props}){
    const [token, setToken] = useState(props.token)
  }


  //non finito per tempo




  return (
    <div className="App">
      <div>
      {MostraRegistrazione && (
        <div>
          <div>
            <label>Username:</label>
            <input id=" username" onChange={(e)=>{setUsername(e.target.value)}}></input>
          </div>
          

          <div>
            <label>Password:</label>
            <input id=" password" onChange={(e)=>{setPassword(e.target.value)}}></input>
          </div>

          <div>
            <label>Email:</label>
            <input id=" email" onChange={(e)=>{setEmail(e.target.value)}}></input>
          </div>
        </div>        

      )}

      <div>
        <button onClick={registrazione} id="buttonRegistrazione">Registrazione</button>
      </div>

      

      {MostraLogin && (
        <div>
          <div>
            <label>Username:</label>
            <input id="loginUsername"  onChange={(e) =>{setUsernameLogin(e.target.value); }}/>
          </div>

          <div>
            <label>Password:</label>
            <input id="loginPassword"  onChange={(e) =>{setPasswordLogin(e.target.value); }}/>
          </div>
        </div>
      )}


      <div>
        <button onClick={login} id="buttonLogin">Login</button>
      </div>





    </div>

  </div>
  );
      }

export default App;
