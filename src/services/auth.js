import { apiCall } from "./ApiService";
import { config } from "./config";

const loginRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.LOGIN}`;
const registerRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.REGISTER}`;

export const loginUser = (email, password) => {
  return apiCall(
    config.REQ_TYPES.POST,
    loginRoute,
    config.CONTENT_TYPES.APPLICATION_JSON,
    {
      email,
      password,
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    });
};

export const registerUser = (firstName, surname, email, password) => {
  return (
    apiCall(
      config.REQ_TYPES.POST,
      registerRoute,
      config.CONTENT_TYPES.APPLICATION_JSON,
      { email, name: firstName, surname, password, role: "DEVELOPER" }
    )
      .then((r) => {
        if (r.status === 400) throw new Error("Username already exists.");
        if (r.error)
          throw new Error(
            "There has been an error. Please try again or later."
          );
        return r;
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e);
      })
  );
};
