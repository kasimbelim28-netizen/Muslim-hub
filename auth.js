import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* ⭐ PASTE YOUR REAL VALUES HERE */
const SUPABASE_URL="https://xbwgottrnhubmpxhvkrk.supabase.co";
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhid2dvdHRybmh1Ym1weGh2a3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MzI2NzMsImV4cCI6MjA4NzMwODY3M30.EBKwVxdzCtVv9P_S7-IFs1V-NeXRwhuFAL6FUNBEsvk";

const supabase=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

const CLIENT_ID="1474836154225524787";
const REDIRECT_URI="https://muslim-hub-cyan.vercel.app/dashboard.html";

const LOG_WEBHOOK="https://discord.com/api/webhooks/1475502367402233996/9tyecTFCmYzrh4MI9QFIFUzSmu_fpFio2lIPbWv-FfFR9HmtcCgRISI05omfkA1apAe-";

function loginWithDiscord(){

const url=
"https://discord.com/api/oauth2/authorize"+
"?client_id="+CLIENT_ID+
"&redirect_uri="+encodeURIComponent(REDIRECT_URI)+
"&response_type=token"+
"&scope=identify";

window.location.href=url;
}

window.loginWithDiscord=loginWithDiscord;


/* AUTO LOGIN AFTER REDIRECT */

(async function(){

if(!window.location.hash.includes("access_token")) return;

const hash=new URLSearchParams(window.location.hash.substring(1));
const token=hash.get("access_token");
if(!token) return;

/* GET DISCORD USER */
const response=await fetch("https://discord.com/api/users/@me",{
headers:{Authorization:"Bearer "+token}
});

const user=await response.json();

localStorage.setItem("discordUser",JSON.stringify(user));

/* SAVE USER IN DATABASE (via your backend API) */

await fetch("/api/save-user",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
id:user.id,
name:user.username
})
});

/* LOGIN LOG */

await fetch(LOG_WEBHOOK,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
content:`✅ Login:\n${user.username} logged into website`
})
});

/* CHECK VERIFICATION */

const verifiedUser=localStorage.getItem("verifiedUser");

if(verifiedUser!==user.username){
window.location.href="verify.html";
return;
}

/* GO DASHBOARD */

window.location.href="dashboard.html";

})();
