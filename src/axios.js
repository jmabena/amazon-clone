import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-challenge-5f236.cloudfunctions.net/api",
  //baseURL: "http://localhost:5001/challenge-5f236/us-central1/api"
});

export default instance;
