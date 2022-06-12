import axios from "axios";
export default axios.create({
    baseURL: "https://api.weather.gov", // change this
    headers: {
        "Content-Type": "application/json"
    }
});