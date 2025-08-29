import axios from "axios";

const TEXTBEE_API_URL = "https://api.textbee.dev/api/v1";
const API_KEY = process.env.REACT_APP_TEXTBEE_API_KEY; // Store your key in .env file as REACT_APP_TEXTBEE_API_KEY

export async function callTextbee(payload: any) {
  try {
    const response = await axios.post(
      TEXTBEE_API_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle error as needed
    throw new Error("Textbee API error: " + error);
  }
}