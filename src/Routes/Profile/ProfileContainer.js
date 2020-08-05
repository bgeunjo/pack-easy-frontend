import React from "react";
import {useQuery, useMutation} from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { withRouter } from "react-router-dom";
import { SEE_USER,LOG_OUT } from "../../Components/Queries";

export default withRouter(({match: {params: {username}}}) =>{
    const context={
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };

    const {data,loading} = useQuery(SEE_USER, {
        variables:{username},
        context
    });
    const [logOut] = useMutation(LOG_OUT, {
        context
    });
    return <ProfilePresenter loading={loading} data={data} logOut={logOut}/>;
});
