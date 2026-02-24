const CLIENT_ID="1474836154225524787";
const REDIRECT_URI="https://muslim-hub-cyan.vercel.app/dashboard.html";

const SUPABASE_URL="https://xbwgottrnhubmpxhvkrk.supabase.co";
const SUPABASE_ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...svk";

const LOG_WEBHOOK="https://discord.com/api/webhooks/1475502367402233996/9tyecTFCmYzrh4MI9QFIFUzSmu_fpFio2lIPbWv-FfFR9HmtcCgRISI05omfkA1apAe-";

const supabase = window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON);

function loginWithDiscord(){

const url =
"https://discord.com/api/oauth2/authorize"+
"?client_id="+CLIENT_ID+
"&redirect_uri="+encodeURIComponent(REDIRECT_URI)+
"&response_type=token"+
"&scope=identify";

window.location.href=url;

}


// AFTER DISCORD REDIRECT
(async function(){

if(!window.location.hash.includes("access_token")) return;

const hash=new URLSearchParams(window.location.hash.substring(1));
const token=hash.get("access_token");

if(!token) return;

// GET DISCORD USER
const res=await fetch("https://discord.com/api/users/@me",{
headers:{Authorization:"Bearer "+token}
});

const user=await res.json();

localStorage.setItem("discordUser",JSON.stringify(user));


// SAVE USER TO DATABASE
await supabase
.from("users")
.upsert({
id:user.id,
name:user.username
});


// SEND LOGIN LOG
fetch(LOG_WEBHOOK,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
content:`✅ Login:\n${user.username} logged into website`
})
});


// CHECK VERIFIED STATUS
const {data}=await supabase
.from("users")
.select("verified")
.eq("id",user.id)
.single();

if(!data?.verified){
window.location.href="verify.html";
return;
}

// CLEAN URL + GO DASHBOARD
window.location.href="dashboard.html";

})();
