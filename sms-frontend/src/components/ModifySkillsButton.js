import React from 'react'
import { Link } from 'react-router-dom';

const ModifySkillsButton = () => {
    return (
        <React.Fragment>
            <Link to="/addSkills" className="btn btn-lg btn-info">
                Add Skills
            </Link>
        </React.Fragment>
    );
};

export default ModifySkillsButton;
