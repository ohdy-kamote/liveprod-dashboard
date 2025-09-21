import axios from "axios";

const TEXTBEE_API_URL = "https://api.textbee.dev/api/v1";
const API_KEY = process.env.TEXTBEE_API_KEY; // Store your key in .env file as TEXTBEE_API_KEY
const DEVICE_ID = process.env.TEXTBEE_DEVICE_ID; // Store your device id in .env file as TEXTBEE_DEVICE_ID

export async function callTextbee(payload: any) {
  try {
    const response = await axios.post(
      `${TEXTBEE_API_URL}/gateway/devices/${DEVICE_ID}/send-sms`,
      {
        recipients: [payload.to],
        message: payload.message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY, // Use x-api-key instead of Authorization
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Textbee API error: " + error);
  }
}