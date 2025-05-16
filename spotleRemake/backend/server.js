import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

//Backend with NodeJs and Express

//Useing dotenv to keep Delveper Secret and ID Confidently

dotenv.config();
const app = express();

//Use of cors for local-use
app.use(cors());
app.get('/api/token', async (req, res)=>{
    //ID and Secreft for Authentication
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    //Encode Id and Secret together for authentifcation
    const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    try{
            //fetch token from spotify
            const response = await fetch ("https://accounts.spotify.com/api/token",{
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${encoded}`,
                  },
                  body: "grant_type=client_credentials",
                })
            const data = await response.json();
            //respond with token data
            res.json(data); // { access_token, token_type, expires_in }                   
        } catch (err){
            //error with authentification and token retrieval
            res.status(500).json({error:"fail"});
        }
    }
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});