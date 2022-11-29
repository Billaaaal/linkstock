import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes , Route, Link, BrowserRouter, useLocation, useNavigate, useParams} from "react-router-dom";
import logo from './logo.svg';
import './Home.css';
import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, child, get} from "firebase/database";
//import { getAnalytics } from "firebase/analytics";






function App() {
    // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
  apiKey: "AIzaSyDc4GYP0J3t6Jq6Bd06lZNKhEkzylHptwM",
  authDomain: "linkstockapp.firebaseapp.com",
  databaseURL: "https://linkstockapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "linkstockapp",
  storageBucket: "linkstockapp.appspot.com",
  messagingSenderId: "707209791175",
  appId: "1:707209791175:web:6b98e6a4845c81e0c2e0e2",
  measurementId: "G-QVFTVD2CGJ"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //const analytics = getAnalytics(app);
  //const db = getDatabase();
  //const reference = ref(db, 'LinksDatabase/'  + "billaaaaaal");
  //set to lowercase !!!!! .toLowerCase();
  //set(reference, {
  //  message: "message",
  //  user: "user",
  //});

  let navigate = useNavigate();

  function goToCreate(claimedLink:String) {

  
    navigate("/create", { state: { claimedLink: claimedLink } });
  }

  

  
  





  const [claimedLink, setclaimedLink] = useState('')

  function claimLinkstock(){
    if(claimedLink==""){
      alert("Please enter a username")
    }else{
      const dbRef = ref(getDatabase());
      get(child(dbRef, `LinksDatabase/${claimedLink}`)).then((snapshot) => {
      if (snapshot.exists()) {
        alert("This username already exists");
      } else {
        goToCreate(claimedLink);

         
        
        //
      }

    })
    }
    
  }
  
 
  return (
    
    
    

      <body className="homeBody">
        
          <div className="elements">
      

            <div className="navbar">
              <img id ="logo" src="https://svgshare.com/i/nc7.svg"/>
              <div className="Login_button"><a href="https://www.google.com" className="Login_text">Log in</a></div>
              <div className="Signup_button"><a className="Signup_text">Sign up</a></div>
              <svg className="hamburger" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5H16" stroke="#1e2330"></path><path d="M0 13.5H16" stroke="#1e2330"></path><path d="M0 8H16" stroke="#1e2330"></path></svg>
            </div> 

            <div className="main_head">
              <h2 id="main_title">Everything you are.
              In one simple link.</h2>
              <h2 id="paragraph">Join 25M+ people and share everything you create, curate and sell online. All from the one link in bio.</h2>
            </div>

            <div className="form_elements">
              <div id="form_div">
                <h2 id="link_text">linkstock.com/</h2>
                <input id="link_input" type="text" placeholder="yourname" onChange={event => setclaimedLink(event.target.value.toLowerCase())} /> 
              </div>
              <button id="button" type="button" onClick={claimLinkstock}>Claim your Linkstock</button>
            </div>

            <img className="img_header" src="https://i.postimg.cc/GmPq44dF/header.png"></img>
      
      

      

          </div>
        

      </body>
      
      

    




  // <Route path="" element={<p>Create your LinkStock now</p>}/>
  //<Route path="*" element={<p>Welcome to {useLocation().pathname.replace("/", "")}'s LinkStock</p>}/>
  //<li><img id ="logo" src="https://svgshare.com/i/nc7.svg"></img></li>
  //<img id ="logo" src="https://svgshare.com/i/nc7.svg"/>
  );
}

export default App;
