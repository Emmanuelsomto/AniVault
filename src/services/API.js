import axios from "axios";

export const api = axios.create({
  baseURL: "https://kitsu.io/api/edge",
  headers: {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  },
});

export const getTrendingAnime = async (signal) => {
  const response = await api.get("/trending/anime", { signal });
  return response.data.data;
};
