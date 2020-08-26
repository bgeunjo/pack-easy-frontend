import React, {useState} from "react"
import {useQuery, useMutation} from "react-apollo-hooks";
import { MY_PROFILE,EDIT_USER } from "../../Components/Queries";
import EditProfilePresenter from "./EditProfilePresenter"
import { withRouter } from "react-router-dom";
import useInput from "../../Hooks/useInput"
import { toast } from 'react-toastify';

export default withRouter(({history}) => {
    const context={
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    //const [dataS, setData] = useState({
    //    seeMyProfile:{
    //        username: "bbang",
    //        email: "airmancho@korea.1.3",
    //        bio: "hello"
    //    }
    //});
    const {data,loading} = useQuery(MY_PROFILE, {
        context
    });
    const username2 = useInput("");
    const email = useInput("");
    const bio = useInput("");
    const [editProfileMutation] = useMutation(EDIT_USER, {
        variables: {
            email: email.value,
            username: username2.value,
            bio: bio.value
        },
        context
    });
    const onSubmit = async e => {
        e.preventDefault();
        if(email.value !== "" &&
            username2.value !== ""
            ){
                try{
                    const {data:{editProfile}} = await editProfileMutation();
                    if(data.seeMyProfile===undefined){
                        toast.error(e.message)
                    }else{
                        toast.success("Successfully edit profile!");
                        history.push(`/${username2.value}`)
                    }
                }catch(e){
                    toast.error(e.message);
                }
            }else{
                toast.error("All field are required.");
            }
        };
        
    return (
        <EditProfilePresenter
        loading={loading}
        data={data} 
        username={username2} 
        email={email}
        bio={bio}
        onSubmit={onSubmit}
        />
    );
})