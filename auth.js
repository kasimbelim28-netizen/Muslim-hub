function loginWithDiscord() {

  const CLIENT_ID = "1474836154225524787";
  const REDIRECT_URI = "https://muslim-hub-cyan.vercel.app/dashboard.html";

  const url =
    "https://discord.com/api/oauth2/authorize" +
    "?client_id=" + CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
    "&response_type=token" +
    "&scope=identify";

  window.location.href = url;
}
