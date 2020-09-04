import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader"
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../../Components/FatText";
import Helmet from "react-helmet";
import MarkdownContainer from "../../Components/Markdown"
import {Link} from "react-router-dom";
import "./index.scss"
import { FullHeart,EmptyHeart, Comment as CommentIcon, Calendar as CalendarIcon, FullUser as FullUserIcon} from "../../Components/Icons";


const Wrapper = styled.div`
    min-height: 100vh;
    width:100%;
`;

const Post = styled.div`
    ${props=>props.theme.whiteBox};
    width: 100%;
    max-width: ${props=>props.theme.maxWidth};
    margin-bottom:25px;
    user-select: none;
    a {
        color: inherit;
    }
`;

const FullUser=styled(FullUserIcon)`
    margin:0 5px;
`;

const Calendar=styled(CalendarIcon)`
    margin: 0 5px;
`;
const Header = styled.header`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    flex: auto;
    padding-right:15px;
    padding-left:15px;
    padding-top:15px;
    display: flex;
`;
const Title = styled.div`
    font-size: 30px;
    padding: 3px 0;
`;
const UserColumn = styled.div`
    margin-left:10px;
`;

const Location = styled.span`
    display: block;
    margin-top:10px;
    font-size:12px;
`;

const Files= styled.div`
    position: relative;
    padding-bottom:100%;
    display:flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
`;

const File = styled.div`
    position:absolute;
    top:0;
    max-width:100%;
    width:100%;
    height:600px;
    background-image: url(${props=>props.src});
    background-size: cover;
    background-position: center;
    opacity: ${props=> (props.showing ? 1 : 0)};
    transition: opacity .5s linear;
`;

const Button = styled.span`
    cursor: pointer;
`;

const Meta = styled.div`
    padding-left:15px;
    padding-bottom:15px;
`;

const Buttons = styled.div `
    ${Button}{
        &:first-child{
            margin-right:10px;
        }
    }
    margin-bottom:10px;
    
`;

const Timestamp = styled.span`
    font-weight: 300;
    opacity: 0.5;
    font-weight: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props=>props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
    font-size:14px;
    border: none;
    width: 100%;
    resize:none;
    &:focus{
        outline:none;
    }
`;

const Comments = styled.ul`
    margin-top : 10px;
`;

const Comment= styled.li`
    margin-bottom: 7px;
    line-height: 18px;
    span {
        margin-right: 5px;
    }
`;

const Content = styled.div`
    marign: 10px 0px;
    font-size: 20px;
`;


export default ({loading,data}) => {
    if(loading===true){
        return (
            <Wrapper>
                <Loader/>
            </Wrapper>
        )
    }
    else if (!loading && data && data.seeFullPost) {
        const {
            seeFullPost: {
                id,
                title,
                files,
                content,
                user,
                comments,
                createdAt
            }
        } = data;
        return (
            <>
            <Helmet>
            </Helmet>
            <MarkdownContainer/>
            </>
        )
    }
    return null;
}