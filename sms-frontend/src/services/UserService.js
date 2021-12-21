import axios from "axios";

const api = "http://localhost:8080/";

class UserService {
  addUser(user) {
    return axios.post(api + "register", user);
  }
  signInUser(user) {
    return axios.post(api + "authenticate", user);
  }

  getUsers() {
    return axios.get(api + "getAllUsers");
  }

  getUser() {
    const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    return axios.get(api + `viewUserByuserName/${user.userName}`, config);
  }

  authenticateUsername(username) {
    return axios.get(api + `checkUserName/${username}`);
  }
}

export default new UserService();
