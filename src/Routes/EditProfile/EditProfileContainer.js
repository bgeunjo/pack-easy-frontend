import React from "react";
import Proptypes from "prop-types";
import useInput from "../../Hooks/useInput"
import { useMutation, useQuery } from "react-apollo-hooks";
import {EDIT_USER, MY_PROFILE} from "../../Components/Queries"
import { withRouter } from "react-router-dom";

export default withRouter((props) => {
    console.log(props);
//    const context={
//        headers:{
//            Authorization: `Bearer ${localStorage.getItem("token")}`
//        }
//    };
//
//    const {data,loading} = useQuery(MY_PROFILE,{
//        context
//    })
//
//    const username = useInput("");
//    const email = useInput("");
//    const firstName = useInput("");
//    const lastName = useInput("");
//    const bio = useInput("");
//
//    const [editUserMutation]=useMutation(EDIT_USER,{
//        variables:{
//            email: email.value,
//            username: username.value,
//            firstName: firstName.value,
//            lastName: lastName.value,
//            bio: bio.value
//        },
//        context
//    });
//
//    const onSubmit = async e => {
//
//    }
//
   return null;
});