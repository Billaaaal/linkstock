import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Routes , Route, Link, BrowserRouter, useLocation, useNavigate} from "react-router-dom";
import logo from './logo.svg';
import './CreatePage.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import Slider from '@mui/material/Slider';
import { ChromePicker  } from 'react-color'
import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, child, get} from "firebase/database";






function App() {
  useEffect(() => {
    Modal.setAppElement('body');
  }, [])
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


  
  const [importProfilePictureState, setImportProfilePictureState] = useState("Import a profile picture");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [linkModalIsOpen, setlinkModalIsOpen] = React.useState(false);
  const [socialMediaModalIsOpen, setSocialMediaModalIsOpen] = React.useState(false);
  const [backgroundSelectorModalIsOpen, setBackgroundSelectorModalIsOpen] = React.useState(false);
  const [image, setImage] = useState<any | null | string>('https://iio.azcast.arizona.edu/sites/default/files/profile-blank-whitebg.png')
  const[messages_list, setmessages_list] = useState<string[]>([])
  const [fill_color, setFill_color] = React.useState("#000");
  const[profilePictureToShow, setprofilePictureToShow] = useState<string>("https://iio.azcast.arizona.edu/sites/default/files/profile-blank-whitebg.png")
  const [selectedImage, setSelectedImage] = useState<null | any>('https://iio.azcast.arizona.edu/sites/default/files/profile-blank-whitebg.png');
  const [zoom, setZoom] = React.useState<number>(1);

  const [bio, setBio] = useState('');

  const [linkTitle, setLinkTitle] = useState('');
  const [linkURL, setLinkURL] = useState('');
  const [linksArray, setLinksArray] = useState<Array<Object>>([]);
  
  const [socialMediaURL, setSocialMediaURL] = useState('');
  const [socialMediaName, setSocialMediaName] = useState('');
  const [socialMediaArray, setSocialMediaArray] = useState<Array<Object>>([]);

  const [socialMediaPlaceHolder, setSocialMediaPlaceHolder] = useState('');

  const [sketchPickerColor, setSketchPickerColor] = useState('#fff');
  // destructuring rgba from state
  //const { r, g, b, a } = sketchPickerColor;
  const editor = useRef<any>()
  const handleChange = (event: Event, newZoom: number | number[]) => {
    setZoom(newZoom as number);
  };

  function importImage() {
    setIsOpen(true);

  }
  

  function closeModal() {
    setIsOpen(false);
    
  }

  function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };
  



  function addLink(){
    if(linkTitle=="" || linkURL==""){
      alert("Enter a URL and a title")
    }else if(isValidURL(linkURL)==false){
      alert("Enter a valid URL")

    }else{
      linksArray.push({ link:linkURL, title:linkTitle})
      setLinksArray(linksArray)
      setlinkModalIsOpen(false);
    }

    //setLinkTitle("")
    //setLinkURL("")
    
  }

  function closeLinkModal() {
    setlinkModalIsOpen(false);
    

  }



  function addSocialMedia(l){
    setSocialMediaModalIsOpen(true);
    //setmessages_list(l)
  }




  function closeSocialMediaModal() {
    setSocialMediaModalIsOpen(false);
    
  }



  function setBackground(l){
    setBackgroundSelectorModalIsOpen(true);
    //setmessages_list(l)
  }




  function closeBackgroundSelectorModal() {
    setBackgroundSelectorModalIsOpen(false);
    
  }

  function addSocialMediaLink(){
    if(socialMediaName=="" || socialMediaURL==""){
      alert("Enter a URL and a title")
    }else if(isValidURL(socialMediaURL)==false){
      alert("Enter a valid URL")

    }else{
      var found = false;
      for(var i = 0; i < socialMediaArray.length; i++) {
        if (socialMediaArray[i]['socialMediaTitle'] == socialMediaName) {
            found = true
            break;
        }
      } 
      if(found){
          alert(`Your already added a ${socialMediaName} link`)
      }else{
        socialMediaArray.push({ link:socialMediaURL, socialMediaTitle:socialMediaName})
      setSocialMediaArray(socialMediaArray)
      setSocialMediaModalIsOpen(false);
      console.log(socialMediaURL + socialMediaName)

      }
      
    }
  }

  

  








  function SaveAll(){
    const reference = ref(db, 'LinksDatabase/'  + location.state.claimedLink.toLowerCase());
    //set to lowercase !!!!! .toLowerCase();
    set(reference, {
      profilePicture:profilePictureToShow,
      bio:bio,
      background:sketchPickerColor,
      links:linksArray,
      socialMedias:socialMediaArray
    });
    alert("Saved !")

    

    

    
  }

  





  
  const customStyles = {
    content: {
      borderRadius:'20px',
      width: '70%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      backgroundColor:'#bdc5cf',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const customStylesProfilePictureSelector = {
    content: {
      borderRadius:'20px',
      width: '70%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      backgroundColor:'#bdc5cf',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };



  const customStylesBackgroundSelector = {
    content: {
      borderRadius:'20px',
      width: '70%',
      height: '300px',
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      backgroundColor: `${sketchPickerColor}`,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  const styyle = {
    content: {
      width: '250px', height: '250px'
    }

  }
  
  

  let location = useLocation();
  //console.log(location.state.claimedLink);
  var l: React.SetStateAction<string[]> = [];
  l.push("Hello")




  function handleScaledImage(){
    
      
  // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
  // drawn on another canvas, or added to the DOM.
  // const canvas = editor!.current!.getImage()
  //console.log("canvas.toString()")
  //const canvas = URL.createObjectURL(editor!.current!.getImage()!.files![0])
  const canvas = editor.current.getImageScaledToCanvas().toDataURL();
  setprofilePictureToShow(canvas)
  setImportProfilePictureState("Change profile picture")
  closeModal()
  setZoom(1)
  //console.log(canvas)
  
  //console.log("canvas.toString() done")

  

  // If you want the image resized to the canvas size (also a HTMLCanvasElement)
  //const canvasScaled = editor!.current!.getImageScaledToCanvas()

  

    
  }

  //const self: any = this;
  
 
  return (
    
    

      <body className="bodyCreate">

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStylesProfilePictureSelector}
        contentLabel="Example Modal">

        <div className="profilePictureSelectorModalContainer">

          <h2 className="importProfilePictureText">Import a profile picture</h2>
          <AvatarEditor backgroundColor={"#fff"} ref={editor} width={150} height={150} borderRadius ={250} scale={zoom} image={selectedImage} /> 
          <input
          id="actual-btn"
          type="file"
          name="myImage"
          hidden
          onChange={(event) => {
            //console.log(event!.target!.files![0]);
            setSelectedImage(URL.createObjectURL(event!.target!.files![0]));}}>
              
          </input>
          <label htmlFor="actual-btn">Choose image</label>
          <Slider value={zoom} min={0.1} max={4} step={0.01} aria-label="Default" valueLabelDisplay="auto" onChange={handleChange} />
        
          <button className="importImageSaveButton" onClick={handleScaledImage}>Save</button>
          
            
          
        </div>
        
        
        
      </Modal>

      

      <Modal
        isOpen={linkModalIsOpen}
        onRequestClose={closeLinkModal}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="linkModalContainer">
          <h2 className="addLinkText">Add link</h2>
          <input className="linkInput" type='text' placeholder="Title" onChange={(evt) => { setLinkTitle(evt.target.value); }} ></input>
          <input className="linkInput" type='text' placeholder="Link" onChange={(evt) => { setLinkURL(evt.target.value); }} ></input>
          <button className="linkSaveButton" type='button' onClick={addLink}>Save</button>
        </div>
          
        
      </Modal>

      <Modal
        isOpen={socialMediaModalIsOpen}
        onRequestClose={closeSocialMediaModal}
        style={customStyles}
        contentLabel="Example Modal">

        <div className="sociaMediaModalContainer">
          <h2 className="addLinkText">Add social Media</h2>

          <div className="socialMediasContainerToChoose">
            <button className="socialMediaSelfButton" onClick={() => {setSocialMediaName("Instagram"); setSocialMediaPlaceHolder("www.instagram.com/");}}>
            <svg className="socialMediaSelfSvg" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </button>

            <button className="socialMediaSelfButton" onClick={() => {setSocialMediaName("Twitch"); setSocialMediaPlaceHolder("www.twitch.tv/");}}>
            <svg  className="socialMediaSelfSvg"  fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
            </button>

            <button className="socialMediaSelfButton" onClick={() => {setSocialMediaName("Tiktok"); setSocialMediaPlaceHolder("www.tiktok.com/");}}>
            <svg  className="socialMediaSelfSvg"  fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" id="icons"><path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/></svg>
            </button>

            <button className="socialMediaSelfButton" onClick={() => {setSocialMediaName("YouTube"); setSocialMediaPlaceHolder("www.youtube.com/");}}>
            <svg  className="socialMediaSelfSvg"  fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </button>

            <button className="socialMediaSelfButton" onClick={() => {setSocialMediaName("Twitter"); setSocialMediaPlaceHolder("www.twitter.com/");}}>
            <svg className="socialMediaSelfSvg"  fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </button>

            <button className="socialMediaSelfButton" onClick={() => {setSocialMediaName("Spotify"); setSocialMediaPlaceHolder("www.open.spotify.com/artist/");}}>
            <svg  className="socialMediaSelfSvg"  fill="#fff" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/></svg>
            </button>
            
        </div>
          {/*<select id="select">
            <option value="6th">Instagram</option>
            <option value="6th">Twitter</option>
            <option value="6th">Tiktok</option>
            <option value="6th">Youtube</option>
            <option value="6th">Twitch</option>
            <option value="6th">Spotify</option>
          
          </select>*/}
          <input className="linkInputSocialMedia" type='text' placeholder={socialMediaPlaceHolder} onChange={(evt) => { 
            if(socialMediaName==""){
              alert("Select a social media")
            }else{
              setSocialMediaURL(evt.target.value); 

            }
            }} ></input>
          <button className="socialMedialinkSaveButton" type='button' onClick={addSocialMediaLink}>Save</button>
        </div>
          
        
      </Modal>

      <Modal
        isOpen={backgroundSelectorModalIsOpen}
        onRequestClose={closeBackgroundSelectorModal}
        style={customStylesBackgroundSelector}
        contentLabel="Example Modal">
        <div className="linkModalContainer">
          <h2 className="addLinkText">Select a background</h2>

          
          <ChromePicker
            onChange={(color) => {
              setSketchPickerColor(color.hex);
            }}
            color={sketchPickerColor}
          />
          {/*<button className="Signup_button" onClick={SaveAll}>Save</button>*/}
        
          
        
        </div>
          
        
      </Modal>
              
      <div className="elementsCreate">


        <div className="navbar">
          <img id ="logo" src="https://svgshare.com/i/nc7.svg"/>
          <div className="Login_button"><a href="https://www.google.com" className="Login_text">Home</a></div>
          <button className="Signup_button" onClick={SaveAll}>Save</button>
          <svg className="hamburger" width="16" height="16" viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5H16" stroke="#fff"></path><path d="M0 13.5H16" stroke="#fff"></path><path d="M0 8H16" stroke="#fff"></path></svg>
        </div>

        

        
        <div className="profilePictureContainer">
          <img src={profilePictureToShow} className ="profilePictureImage"></img>
          <button className="chooseProfilePictureButton" type='button'  onClick={importImage}>{importProfilePictureState}</button>
        </div>

        
        <h2 id="userNameText">@{location.state.claimedLink}</h2>

        <textarea id="bio_input" placeholder="Enter your bio"  rows={1} cols={3} onChange={(evt) => { setBio(evt.target.value); }} ></textarea> 


        {/*{<h2 className="yrLinks">Add links</h2>}*/}

        <div className="buttons">

          <div className="buttonContainer">
            <button className="roundedButton" type='button' onClick={() => setlinkModalIsOpen(true) }><svg className="linkSvg" enable-background="new 0 0 512 512" version="1.1" viewBox="-40 -60 612 612" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
              <path d="m459.65 233.37-90.531 90.5c-49.969 50-131.03 50-181 0-7.875-7.844-14.031-16.688-19.438-25.813l42.063-42.063c2-2.016 4.469-3.172 6.828-4.531 2.906 9.938 7.984 19.344 15.797 27.156 24.953 24.969 65.563 24.938 90.5 0l90.5-90.5c24.969-24.969 24.969-65.563 0-90.516-24.938-24.953-65.531-24.953-90.5 0l-32.188 32.219c-26.109-10.172-54.25-12.906-81.641-8.891l68.578-68.578c50-49.984 131.03-49.984 181.03 0 49.97 49.986 49.97 131.03 1e-3 181.02zm-239.33 148.81-32.203 32.219c-24.953 24.938-65.563 24.938-90.516 0-24.953-24.969-24.953-65.563 0-90.531l90.516-90.5c24.969-24.969 65.547-24.969 90.5 0 7.797 7.797 12.875 17.203 15.813 27.125 2.375-1.375 4.813-2.5 6.813-4.5l42.063-42.047c-5.375-9.156-11.563-17.969-19.438-25.828-49.969-49.984-131.03-49.984-181.02 0l-90.5 90.5c-49.984 50-49.984 131.03 0 181.03 49.984 49.969 131.03 49.969 181.02 0l68.594-68.594c-27.407 4.031-55.548 1.281-81.642-8.875z"/>
              </svg>
            </button>
            <h1 className="buttonText">Add Link</h1>
          </div>

          
          
          <div className="buttonContainer">
            <button className="roundedButton" type='button' onClick={addSocialMedia}>
            <svg className="socialSvg" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            </button>
            <h1 className="buttonText">Add platform</h1>
          </div>

          <div className="buttonContainer">
              <button className="roundedButton" type='button' onClick={setBackground}>
                        <svg  className="linkSvg" xmlns="http://www.w3.org/2000/svg" viewBox="-10 -30 170 170">
              <path d="M143.209,105.968c0,6.25-5.113,11.364-11.363,11.364H18.203c-6.25 0-11.363-5.113-11.363-11.364v-86.37c0-6.25,5.113-11.363 11.363-11.363h113.643c6.25,0,11.363,5.113,11.363,11.363V105.968z M18.203,17.326c-1.207,0-2.271,1.068-2.271,2.271v86.37c0,1.207,1.065 2.271,2.271,2.271h113.643c1.203,0,2.274-1.064 2.274-2.271v-86.37c0-1.203-1.071-2.271-2.274-2.271H18.203z M38.661,53.691c-7.529,0-13.641-6.108-13.641-13.635s6.112-13.638,13.641-13.638 c7.526,0,13.632,6.111,13.632,13.638S46.188,53.691,38.661,53.691z M125.025,99.15H25.02V85.51l22.73-22.724l11.363,11.36l36.365-36.361l29.547,29.547V99.15z"/>
              </svg>
            </button>
            <h1 className="buttonText">Background</h1>
          </div>        

          
        </div>


        <div className="socialMediaLinksContainer">
        {socialMediaArray.map((socialMediaSelf, index) => {
              
              switch(socialMediaSelf['socialMediaTitle']) {
                case "Instagram":
                  //alert("InstagramUwU")
                  return (<div className="socialMediaSelf">
                          <svg className="socialMediaSelfSvg" fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                          </div>)
                  break;
                case "Twitch":
                  //alert("InstagramUwU")
                  return (<div className="socialMediaSelf">
                          <svg  className="socialMediaSelfSvg"  fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
                          </div>)
                  break;
                case "Tiktok":
                  //alert("InstagramUwU")
                  return (<div className="socialMediaSelf">
                          <svg  className="socialMediaSelfSvg"  fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" id="icons"><path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/></svg>
                          </div>)
                  break;    
                case "YouTube":
                //alert("InstagramUwU")
                return (<div className="socialMediaSelf">
                        <svg  className="socialMediaSelfSvg"  fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                       </div>)
                break;  
                case "Twitter":
                //alert("InstagramUwU")
                return (<div className="socialMediaSelf">
                      <svg className="socialMediaSelfSvg"  fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                       </div>)
                break;
                case "Spotify":
                //alert("InstagramUwU")
                return (<div className="socialMediaSelf">
                       <svg  className="socialMediaSelfSvg"  fill="#000" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/></svg>
                      </div>)
                break;
                
              }
          })}


            
            
        </div>

        

        <div className="linksContainer">
        {linksArray!.map((linkSelf, index) => 
          
          
          (<div className="link" key={index}>
            <h2 className="linkTitle" >{linkSelf['title']}</h2>
          </div>))}
          

        </div>
        

        
        

        

        

      </div>


      </body>

  // <Route path="" element={<p>Create your LinkStock now</p>}/>
  //<Route path="*" element={<p>Welcome to {useLocation().pathname.replace("/", "")}'s LinkStock</p>}/>
    
    
  );
}

export default App;
