import React from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet"
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SearchedPost from "../../Components/SearchedPost";
import Button from "../../Components/Button";


const Wrapper = styled.div`
    min-height: 100vh;
`;


const Header = styled.header `
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80;
    margin: 0 auto;
    margin-bottom: 40px;
`;  

const HeaderColumn =styled.div`

`;

const LogOutButton = styled(Button)`
    background-color: ${props=>props.theme.bgColor};
`;

//const UsernameRow= styled.div`
//    display: flex;
//    align-items: center;
//`;


const Username = styled.span`
    font-size:28px;
    line-height:32px;
    margin-bottom:20px;
`;

const Counts = styled.ul`
    display: flex;
    margin-bottom:20px;

`;
const Count = styled.li`
    display: flex;
    font-size:16px;
    &:not(:last-child){
        margin-right:15px;
    }
`;
const CountText = styled(FatText)`
    margin-left:5px;
`;
const FullName = styled(FatText)`
    font-size:16px;
    line-height:24px;
`;
const Bio = styled.p`
    font-size:16px;
    line-height:24px;
`;

const Post = styled.div`
    display: grid; 
    grid-template-columns: repeat(4,200px);
    grid-auto-rows: 200px;
    grid-template-rows: 200px; 
`;

export default ({loading,data,logOut}) => {

    if(loading===true){
        return (
            <Wrapper>
                <Loader/>
            </Wrapper>
        )
    }
    else if (!loading && data && data.seeUser) {
        const {
            seeUser: {
                id,
                avatar,
                username,
                fullName,
                isFollowing,
                isSelf,
                bio,
                followingCount,
                followersCount,
                postCount,
                posts
            }
        } = data;
        return (
            <Wrapper>
            <Helmet>
                <title>
                    {username} | Profile
                </title>
            </Helmet>
                <Header>
                    <HeaderColumn>
                        <Avatar size="lg" url={avatar}/>
                        {!isSelf && <FollowButton id={id} isFollowing={isFollowing}/>}
                    </HeaderColumn>
                    <HeaderColumn>
                        <Username>{username}</Username>
                        {isSelf ? (
                            <LogOutButton onClick={logOut} text="로그아웃"/>
                        ) : (
                            <FollowButton isFollowing={isFollowing} id={id}/>
                        )}
                        <Counts>
                            <Count>게시물<CountText text={String(postCount)}/></Count>
                            <Count>팔로워<CountText text={String(followersCount)}/></Count>
                            <Count>팔로우<CountText text={String(followingCount)}/></Count>
                        </Counts>
                        <FullName text={fullName}/>
                        <Bio>{" "}{bio}</Bio>
                    </HeaderColumn>
                </Header>
                <Post>
                    {posts && posts.map(post => (
                        <SearchedPost
                            key={post.id}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            file={post.files[0]}
                        />
                    ))}
                </Post>
            </Wrapper>
        )
    }
    return null;
}