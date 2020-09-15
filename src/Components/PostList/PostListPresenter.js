import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import {Link} from "react-router-dom"
import { FullHeart,EmptyHeart, Comment as CommentIcon, Calendar as CalendarIcon, FullUser as FullUserIcon} from "../Icons";

const Post = styled.div`
    ${props=>props.theme.whiteBox};
    width: 100%;
    color: ${props=>props.theme.blackColor};
    ${props=>props.theme.Wrapper};
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


export default ({
    id,
    user: {
        username
    },
    files,
    isLiked,
    likeCount,
    createdAt,
    newComment,
    currentItem,
    toggleLike,
    onKeyPress,
    comments,
    selfComments,
    title,
    content
}) => (
<Post>
    <Link to={"/post/"+id}>
        <Header>
            <Title>
                <FatText text={title}/>
            </Title>
            <Timestamp>
                <Calendar/>
                <FatText text={createdAt.slice(0,10)+" /"}/>
                <FullUser/>
                <FatText text={username}/>
            </Timestamp>
        </Header>
    </Link>
    {/*<Files>
        {files && files.map((file,index) => <File key={file.id} src={file.url} showing={index===currentItem}/>)}
    </Files>*/}
    <Meta>
    <Content>
        {content}
    </Content>
    {/*<Buttons>
        <Button onClick={toggleLike}>
            {isLiked ? <FullHeart/> : <EmptyHeart/>}
        </Button>
        <Button>
            <CommentIcon/>
    </Button>
    </Buttons>
    <FatText text={`좋아요 ${likeCount} 개`}/>
    {
        comments && (
            <Comments>
                {comments.map(comment => (
                    <Comment key={comment.id}>
                        <FatText text={comment.user.username}/>
                        {comment.text}
                    </Comment>
                ))}
                {selfComments.map(comment => (
                    <Comment key={comment.id}>
                        <FatText text={comment.user.username}/>
                        {comment.text}
                    </Comment>
                ))}
            </Comments>
        )
    }
    <Textarea 
        placeholder={"댓글 달기..."}
        value = {newComment.value}
        onChange={newComment.onChange}
        onKeyPress={onKeyPress}
/>*/}
    </Meta>
</Post>
);