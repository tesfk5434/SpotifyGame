import './App.css'
import logo from './assets/Spotify_logo.png';
import SearchBar from './components/searchBar.jsx';
import {useEffect, useState} from 'react';
async function getToken(){
  //fetch token data from backend
  const response = await fetch("http://localhost:3001/api/token");
  const data = await response.json();
  const expiresInMs = data.expires_in * 1000; // convert to milliseconds
  const expiresAt = Date.now() + expiresInMs;
  //store token and it's exipirary date
  localStorage.setItem("spotify_token", data.access_token);
  localStorage.setItem("spotify_token_expires", expiresAt.toString());
  //return name of token
  return data.accessToken;
}

function App() {
  //set token to token stored in local storage if available
  const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_token"));
  useEffect(() => {
    //check if token is still valid
    const needsNewToken = () => {
      const expiresAt = localStorage.getItem("spotify_token_expires");
      return !expiresAt || Date.now() >= Number(expiresAt);
    };
    //if new token is need, receive a new one
    async function checkToken() {
      if (needsNewToken()) {
        const newToken = await getToken();
        setAccessToken(newToken);
      }
    }
    checkToken();
  }, []);
  
  return (
    <>
    <div className='content'>
      <div className='center'>
        <div className='img-div'>
          <img src={logo}></img>
        </div>
        <SearchBar accessToken={accessToken}/>
      </div>
    </div>
    </>
  )
}
export default App
