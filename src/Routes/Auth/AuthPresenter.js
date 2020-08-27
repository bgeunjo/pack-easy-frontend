import React from "react"
import styled from "styled-components"
import Helmet from "react-helmet";
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
    action,
    userId,
    username,
    email,
    firstName,
    lastName,
    setAction,
    onSubmit,
    secret
}) =>  (
        <Wrapper>
            <Form>
                {action === "logIn" && (
                    <>
                    <Helmet>
                    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
                    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
                    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
                    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="msapplication-TileColor" content="#ffffff"/>
                    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
                    <meta name="theme-color" content="#ffffff"/>
                        <title>CANTBEGOSU</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"전화번호, 사용자 이름 또는 이메일"} {...email} />
                        <Button text={"로그인"} />
                    </form>
                    </>
                )} 
                {action === "signUp" && (
                    <>
                    <Helmet>
                        <title>CANTBEGOSU</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"휴대폰 번호 또는 이메일 주소"} {...email} type="email" />
                        <Input placeholder={"이름"} {...firstName} />
                        <Input placeholder={"성"} {...lastName} />
                        <Input placeholder={"사용자 이름"} {...username} />
                        <Button text={"가입"} />
                    </form>
                    </>
                )}
                {action === "confirm" && (
                <>
                <Helmet>
                    <title>CANTBEGOSU</title>
                </Helmet>
                <form onSubmit={onSubmit}>
                    <Input placeholder="비밀값" {...secret} required />
                    <Button text={"확인"} />
                </form>
                </>
                )}
            </Form>

            {action !== "confirm" && (
                <StateChanger>
                    {action ==="logIn" ? (
                        <>
                            계정이 없으신가요?{" "}
                            <Link onClick={()=> setAction("signUp")}>가입하기</Link>
                        </>
                    ) : (
                        <>
                            계정이 있으신가요?{" "}
                            <Link onClick={()=> setAction("logIn")}>로그인</Link>
                        </>
                    )}
                </StateChanger>
            )}
        </Wrapper>
    );