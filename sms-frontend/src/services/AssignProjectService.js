import axios from 'axios';

const api = "http://localhost:8080/";
class AssignProjectService {

    async UpdateProjectName(userName, userProjectName) {
        const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));

        let config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        }
        const data = await axios.put(api + "AddProjectToAssign/" + userName, userProjectName, config);
        return data;
    }

}
export default new AssignProjectService();
