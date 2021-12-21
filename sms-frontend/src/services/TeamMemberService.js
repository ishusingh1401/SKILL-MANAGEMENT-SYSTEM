import axios from "axios";
//const TEAMMEMBER_APP_BASE_URL="http://localhost:8080/updateTeamName";

const api = "http://localhost:8080/";
class TeamMemberService {
  async UpdateTeamName(userName, teamMember) {
    const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const data = await axios.put(
      api + "updateTeamName/" + userName,
      teamMember,
      config
    );
    return data;
  }

  async AddOwnSkills(skill) {
    const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const data = await axios.post(
      api + "addOwnSkill/" + user.userName,
      skill,
      config
    );
    return data;
  }

  async AddSkillsToTeam(skill) {
    const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const data = await axios.post(
      api + "managerAddSkills/" + user.userTeamName,
      skill,
      config
    );
    return data;
  }

  async ModifySkillLevel(payload) {
    const { user, jwtToken } = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const data = await axios.put(
      api + "UpdateSkillLevel/" + user.userName,
      payload,
      config
    );
    return data;
  }
}
export default new TeamMemberService();
