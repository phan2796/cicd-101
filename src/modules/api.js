import axios from "../config/axios";

export const DOMAIN = process.env.REACT_APP_API;

const endpoints = {
  score: `${DOMAIN}/score`
};

export default {
  submitScore(data) {
    return axios({
      method: "post",
      url: endpoints.score,
      data
    });
  },
  getScores() {
    return axios({
      method: "get",
      url: endpoints.score
    });
  }
};
