let IS_PROD = true;

const server = IS_PROD ? 
    "https://rentmotorsbackend.onrender.com" : "http://localhost:3000";

 export default server;