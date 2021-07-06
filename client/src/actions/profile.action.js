import axios from "axios";
import { setAlert } from "./alert.action";
import { GET_PROFILE, PROFILE_ERROR } from "./types.action";

//GET CURRENT USER PROFILE

export const getCurrentProfile = () => async (dispatch) => {
  try {
    console.log(localStorage.token);
    const res = await axios.get("api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profilo Aggiornato" : "Profilo creato"),
        "success"
      );

      //redirect
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
