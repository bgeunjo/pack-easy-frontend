import React, { useState } from "react";
import PropTypes from "prop-types"
import { FOLLOW, UNFOLLOW } from "../Queries"
import { useMutation } from "react-apollo-hooks";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({isFollowing, id,className}) => {
    const context = {
        headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    }
    const [followMutation] = useMutation(FOLLOW, {
        variables: {id},
        context
    });
    const [unfollowMutation] = useMutation(UNFOLLOW, {
        variables: {id},
        context
    });
    const [isFollowingS,setIsFollowing] = useState(isFollowing);

    const onClick = () => {
        if(isFollowingS ===true){
            setIsFollowing(false);
            unfollowMutation();
        }else{
            setIsFollowing(true);
            followMutation();
        }
    }
    return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} className={className}/>
}

FollowButtonContainer.propTypes = {
    isFollowing: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};

export default FollowButtonContainer;