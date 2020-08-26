import React, {useState} from "react"
import { withRouter } from "react-router-dom";

export default withRouter((props) => {
    console.log(props);
    return null;
})
//    const username = useInput("");
//    const email = useInput("");
//    const firstName = useInput("");
//    const lastName = useInput("");
//    const bio = useInput("");
//
//    const [editProfileMutation] = useMutation(EDIT_USER, {
//        variables: {
//            email: email.value,
//            username: username.value,
//            firstName: firstName.value,
//            lastName: lastName.value
//        }
//    });
//   
//    const onSubmit = async e => {
//        e.preventDefault();
//        if(action==="logIn"){
//            if(email.value !==""){
//                try{
//                    const {data:{requestSecret}}= await requestSecretMutation();
//                    /* mutation이 발생할 때 실행할 함수 . requestSecret이 false이면 에러 발생*/
//                        if (!requestSecret) {
//                            toast.error("You don't have an account yet, create one.");
//                            setTimeout(() => setAction("signUp"), 2000);
//                        }else{
//                            toast.success("Check your email for your login secret");
//                            setAction("confirm");
//                        }
//                }catch(e){
//                    toast.error(e.message);
//                }
//            } else{
//                toast.error("Email is required ");
//            }
//        }
//        else if (action === "signUp") {
//            if(email.value !== "" &&
//                username.value !== "" &&
//                firstName.value !== "" &&
//                lastName.value !== ""){
//                    try{
//                        const {data:{createAccount}} = await createAccountMutation();
//                        if(!createAccount){
//                            toast.error(e.message)
//                        }else{
//                            toast.success("Account created! Log in now!");
//                            setTimeout(()=> setAction("logIn"),3000);
//                        }
//                    }catch(e){
//                        toast.error(e.message);
//                    }
//                }else{
//                    toast.error("All field are required.");
//                }
//        }
//        else if (action === "confirm"){
//            if(secret.value !== ""){
//                try {
//                    const {data: {
//                        confirmSecret: token
//                    }}= await confirmSecretMutation();
//                    if (token !== "" && token !== undefined ){
//                        await localLogInMutation({
//                            variables:{token}
//                        });
//                    } else{
//                        throw Error();
//                    }
//                } catch (e) {
//                    toast.error("Can't confirm secret, check again.");
//                }
//            }
//        }
//    };
//    return (
//        <AuthPresenter 
//        setAction={setAction} 
//        action={action}
//        userId={userId} 
//        username={username} 
//        email={email}
//        firstName={firstName}
//        lastName={lastName}
//        onSubmit={onSubmit}
//        secret={secret}
//        />
//    )
