import axios from 'axios';

const api = "http://localhost:8080/";

class ProjectService {
    AddProject(project) {
        const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));


        let config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        };
        return axios.put(api + "AddProject", project, config);

    }
}

export default new ProjectService()