const CLIENT_ID="1474836154225524787";
const REDIRECT_URI="https://muslim-hub-cyan.vercel.app/dashboard.html";

const LOG_WEBHOOK="https://discord.com/api/webhooks/1475502367402233996/9tyecTFCmYzrh4MI9QFIFUzSmu_fpFio2lIPbWv-FfFR9HmtcCgRISI05omfkA1apAe-";

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
.then(async user=>{

localStorage.setItem("discordUser",JSON.stringify(user));

/* SEND LOGIN LOG */
await fetch(LOG_WEBHOOK,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
content:`✅ Login:\n${user.username} logged into website`
})
});

/* CHECK VERIFICATION */
const verified=localStorage.getItem("verifiedUser");

if(!verified){
window.location.href="verify.html";
return;
}

/* CLEAN URL + GO DASHBOARD */
window.location.href="dashboard.html";

});

}

}

})();
