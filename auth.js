const CLIENT_ID="1474836154225524787";
const REDIRECT=window.location.origin;

function login(){
window.location=
`https://discord.com/oauth2/authorize?client_id=${1474836154225524787}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT)}&scope=identify`;
}

if(window.location.hash){
const params=new URLSearchParams(window.location.hash.slice(1));
const token=params.get("access_token");

if(token){
fetch("https://discord.com/api/users/@me",{
headers:{authorization:`Bearer ${token}`}
})
.then(r=>r.json())
.then(data=>{
localStorage.setItem("discordUser",JSON.stringify(data));
window.location="dashboard.html";
});
}
}
