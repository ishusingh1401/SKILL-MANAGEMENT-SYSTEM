import axios from "axios";

const api = "http://localhost:8080/";

class ViewProjectForm {
  ViewProject() {
    const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    return axios.get(api + "viewProjects", config);
  }
}
export default new ViewProjectForm();
