const CLIENT_ID="1474836154225524787";
const REDIRECT_URI="https://muslim-hub-cyan.vercel.app/dashboard.html";

function loginWithDiscord(){

const url =
"https://discord.com/api/oauth2/authorize"+
"?client_id="+CLIENT_ID+
"&redirect_uri="+encodeURIComponent(REDIRECT_URI)+
"&response_type=token"+
"&scope=identify";

window.location.href=url;
}


// AUTO LOGIN AFTER REDIRECT
(function(){

if(window.location.hash.includes("access_token")){

const hash=new URLSearchParams(window.location.hash.substring(1));
const token=hash.get("access_token");

if(token){

fetch("https://discord.com/api/users/@me",{
headers:{Authorization:"Bearer "+token}
})
.then(r=>r.json())
.then(user=>{

localStorage.setItem("discordUser",JSON.stringify(user));

// remove token from URL
window.location.href="dashboard.html";

});

}

}

})();
