export default async function handler(req,res){

if(req.method!=="POST"){
return res.status(405).json({error:"Method not allowed"});
}

const {type,user,message}=req.body;

let webhook="";

if(type==="support"){
webhook="https://discord.com/api/webhooks/1475502488781066320/PIDgCylGmkhnfIJlAFkm9CM13eSYuN03qPefXWjGWS6qMCnk1WI_ygekJY8FfqV4mYUC";
}

if(type==="log"){
webhook="https://discord.com/api/webhooks/1475502367402233996/9tyecTFCmYzrh4MI9QFIFUzSmu_fpFio2lIPbWv-FfFR9HmtcCgRISI05omfkA1apAe-";
}

await fetch(webhook,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
content:`${user}\n${message}`
})
});

res.status(200).json({ok:true});
  }
