import axios from "axios";

export const fcteamApi = axios.create({
  baseURL: "https://fcteam-api.fcamara.com.br/v1",
});
