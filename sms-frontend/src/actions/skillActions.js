import axios from "axios";
import { GET_ERRORS } from "./types";

export const createSkill = (skill, history) => async (dispatch) => {
  const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));

  let config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const data = await axios.post(
    "http://localhost:8080/adminModifySkill",
    skill,
    config
  );
  return data;
};
