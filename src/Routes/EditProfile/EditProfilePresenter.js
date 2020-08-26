import React from "react"
import styled from "styled-components"
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Input from "../../Components/Input";
import Button from "../../Components/Button"


const Wrapper=styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Box = styled.div`
    ${props => props.theme.whiteBox}
    width:100%;
    max-width:350px;
    border-radius: 0px;
`;
// eslint-disable-next-line
const Link = styled.span`
    color: ${props=>props.theme.blueColor};
    cursor: pointer;
`;
// eslint-disable-next-line
const StateChanger = styled(Box)`
    text-align: center;
    padding: 20px 0px;
`

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom : 15px;
    form {
        width: 100%;
        input{
            width: 100%;
            &:not(:last-child){
                margin-bottom: 7px;
            }
        }
        button {
            margin-top: 10px;
        }
    }
`;
export default({
    loading,
    data,
    username,
    email,
    bio,
    onSubmit
}) =>  {
    if(loading===true){
        return (
            <Wrapper>
                <Loader/>
            </Wrapper>
        );
    }
    else if (!loading && data && data.seeMyProfile) {
        return (
        <Wrapper>
            <Form>
                <>
                    <Helmet>
                        <title>CANTBEGOSU</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input  placeholder={data.seeMyProfile.email} {...email}  type="email" />
                        <Input  placeholder={data.seeMyProfile.username} {...username} />
                        <Input  placeholder={data.seeMyProfile.bio} {...bio} />
                        <Button text={"수정"} />
                    </form>
                </>
            </Form>
        </Wrapper>
        );
    }
};