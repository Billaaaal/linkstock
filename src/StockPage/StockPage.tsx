import React, {useState} from 'react';
import { BrowserRouter as Router, Routes , Route, Link, BrowserRouter, useLocation } from "react-router-dom";
import logo from './logo.svg';
import './StockPage.css';
import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, child, get, onValue} from "firebase/database";




function App() {
  const [profilePicture, setProfilePicture] = useState("")
  var [background, setBackground] = useState("")
  var [bio, setBio] = useState("")
  var [links, setLinks] = useState<Array<Object>>([])
  var [socialMedias, setSocialMedias] = useState<Array<Object>>([])



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
  const db = getDatabase();
  //const LinksDatabase = ref(db, 'LinksDatabase');

 // var ref = ref(db, 'LinksDatabase');

 // ref.on(useLocation().pathname.replace("/", ""), function(snapshot) {
 //  snapshot.forEach(function(childSnapshot) {
  //  var childData = childSnapshot.val();
  //  var id = childData.id;
  //  console.log(childData);
  // });
  //});

  const dbRef = ref(getDatabase());
    get(child(dbRef, `LinksDatabase/${useLocation().pathname.replace("/", "")}`)).then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        setBackground(snapshot.val()["background"])
        setBio( snapshot.val()["bio"])
        setProfilePicture(snapshot.val()["profilePicture"])
        setLinks(snapshot.val()["links"])
        setSocialMedias(snapshot.val()["socialMedias"])
        

      } else {
        alert("This page doesn't exist");
      }
    }).catch((error) => {
      console.error(error);
    });
 
  return (
    <body style={{ backgroundColor: background }}>

      <div className="elementsStockPage" style={{ backgroundColor: background }}>


        <div className="navbar">
          <img id ="logo" src="https://svgshare.com/i/nc7.svg"/>
          <div className="Login_button"><a href="https://www.google.com" className="Login_text">Home</a></div>
          <button className="Signup_button">Save</button>
          <svg className="hamburger" width="16" height="16" viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5H16" stroke="#fff"></path><path d="M0 13.5H16" stroke="#fff"></path><path d="M0 8H16" stroke="#fff"></path></svg>
        </div>

        <div className="profilePictureContainer">
          <img src={profilePicture} className ="profilePictureImage"></img>
        </div>

        <h2 id="userNameText">@{useLocation().pathname.replace("/", "")}</h2>

        <div className="socialMediaLinksContainer">

          {socialMedias.map((socialMediaSelf, index) => {
                
                switch(socialMediaSelf['socialMediaTitle']) {
                  case "Instagram":
                    //alert("InstagramUwU")
                    return (
                    <button className="socialMediaSelf" type="button"
                      onClick={(e) => {
                      e.preventDefault();
                      window.location.href="http://" + socialMediaSelf['link'];
                      }}>
                      <svg className="socialMediaSelfSvg" fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </button>
                    )
                    break;
                  case "Twitch":
                    //alert("InstagramUwU")
                    return (
                      <button className="socialMediaSelf" type="button"
                      onClick={(e) => {
                      e.preventDefault();
                      window.location.href="http://" + socialMediaSelf['link'];
                      }}>
                      <svg  className="socialMediaSelfSvg"  fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
                    </button>
                    )
                    break;
                  case "Tiktok":
                    //alert("InstagramUwU")
                    return (<button className="socialMediaSelf" type="button"
                    onClick={(e) => {
                    e.preventDefault();
                    window.location.href="http://" + socialMediaSelf['link'];
                    }}>
                            <svg  className="socialMediaSelfSvg"  fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" id="icons"><path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/></svg>
                            </button>)
                    break;    
                  case "YouTube":
                  //alert("InstagramUwU")
                  return (<button className="socialMediaSelf" type="button"
                  onClick={(e) => {
                  e.preventDefault();
                  window.location.href="http://" + socialMediaSelf['link'];
                  }}>
                          <svg  className="socialMediaSelfSvg"  fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        </button>)
                  break;  
                  case "Twitter":
                  //alert("InstagramUwU")
                  return (<button className="socialMediaSelf" type="button"
                  onClick={(e) => {
                  e.preventDefault();
                  window.location.href="http://" + socialMediaSelf['link'];
                  }}>
                        <svg className="socialMediaSelfSvg"  fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </button>)
                  break;
                  case "Spotify":
                  //alert("InstagramUwU")
                  return (<button className="socialMediaSelf" type="button"
                  onClick={(e) => {
                  e.preventDefault();
                  window.location.href="http://" + socialMediaSelf['link'];
                  }}>
                        <svg  className="socialMediaSelfSvg"  fill="#000" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/></svg>
                        </button>)
                  break;
                  
                }
            })}


              
              
          </div>

          

          <div className="linksContainer">
            {links!.map((linkSelf, index) => 
              
              
              (<button className="link" key={index} type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.href="http://" + linkSelf['link'];
                }}>
                <h2 className="linkTitle" >{linkSelf['title']}</h2>
              </button>))}
            

            </div>

      </div>
    
    </body>


  // <Route path="" element={<p>Create your LinkStock now</p>}/>
  //<Route path="*" element={<p>Welcome to {useLocation().pathname.replace("/", "")}'s LinkStock</p>}/>
    
    
  );
}

export default App;
