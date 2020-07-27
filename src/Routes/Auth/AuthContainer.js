import React, {useState, useEffect} from "react"
import useInput from "../../Hooks/useInput"
import AuthPresenter from "./AuthPresenter"
import {useMutation} from "react-apollo-hooks"
import {LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN} from "./AuthQueries"
import { toast } from 'react-toastify';


export default() => {
    const [action, setAction] = useState("logIn");
    const [{isLoggedIn}, setIsLoggedIn] = useState(false);
    const userId = useInput("");
    const username = useInput("");
    const email = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const secret= useInput("");

    useEffect(()=>{
        return setIsLoggedIn(true);
    },[setIsLoggedIn]);

// eslint-disable-next-line
    const [requestSecretMutation,{requestSecretdata}] = useMutation(LOG_IN, {
        variables: { email: email.value }
    });
// eslint-disable-next-line   
const [createAccountMutation,{data}] = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value

        }
    });
// eslint-disable-next-line
    const [confirmSecretMutation,{confirmdata}] = useMutation(CONFIRM_SECRET, {
        variables:{
            email: email.value,
            secret:secret.value
        }
    });
// eslint-disable-next-line
    const [localLogInMutation,{logindata}] = useMutation(LOCAL_LOG_IN);

    const onSubmit = async e => {
        e.preventDefault();
        if(action==="logIn"){
            if(email.value !==""){
                try{
                    const {data:{requestSecret}}= await requestSecretMutation();
                    /* mutation이 발생할 때 실행할 함수 . requestSecret이 false이면 에러 발생*/
                        if (!requestSecret) {
                            toast.error("You don't have an account yet, create one.");
                            setTimeout(() => setAction("signUp"), 2000);
                        }else{
                            toast.success("Check your email for your login secret");
                            setAction("confirm");
                        }
                }catch(e){
                    toast.error(e.message);
                }
            } else{
                toast.error("Email is required ");
            }
        }
        else if (action === "signUp") {
            if(email.value !== "" &&
                username.value !== "" &&
                firstName.value !== "" &&
                lastName.value !== ""){
                    try{
                        const {data:{createAccount}} = await createAccountMutation();
                        if(!createAccount){
                            toast.error(e.message)
                        }else{
                            toast.success("Account created! Log in now!");
                            setTimeout(()=> setAction("logIn"),3000);
                        }
                    }catch(e){
                        toast.error(e.message);
                    }
                }else{
                    toast.error("All field are required.");
                }
        }
        else if (action === "confirm"){
            if(secret.value !== ""){
                try {
                    const {data: {
                        confirmSecret: token
                    }}= await confirmSecretMutation();
                    if (token !== "" && token !== undefined ){
                        await localLogInMutation({
                            variables:{token}
                        });
                    } else{
                        throw Error();
                    }
                } catch (e) {
                    toast.error("Can't confirm secret, check again.");
                }
            }
        }
    };
    return (
        <AuthPresenter 
        setAction={setAction} 
        action={action}
        userId={userId} 
        username={username} 
        email={email}
        firstName={firstName}
        lastName={lastName}
        onSubmit={onSubmit}
        secret={secret}
        />
    )
};