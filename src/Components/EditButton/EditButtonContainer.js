import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EditButton = ({isSelf,to,text}) => {
    const context = {
        headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    }
    const onClick = () => {
        if(isSelf ===true){
            setIsFollowing(false);
            unfollowMutation();
        }else{
            setIsFollowing(true);
            followMutation();
        }
    }
}

EditButton.propTypes= {
    text:PropTypes.string
}

export default EditButton;