import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Helmet} from "react-helmet"
import Loader from "../../Components/Loader";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SearchedPost from "../../Components/SearchedPost";
import Button from "../../Components/Button";
import { Setting } from "../../Components/Icons";


const Wrapper = styled.div`
    ${props=>props.theme.Wrapper}
    min-height: 100vh;
`;

const Settings= styled(Setting)`
    margin-left: 15px;
`;

const Header = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-shrink:0;
    width: 100%;
    margin-bottom: 40px;
`;  

const HeaderColumn =styled.div`
    display: grid;
    justify-content: center;
    flex-grow:1;
`;
const HeaderInfo = styled.section`
    display: flex;
    flex-direction: column;
    flex-basis: 30px;    
    flex-grow:2;
`

const HeaderRow =styled.div`
    display: flex;
    align-items: center;
    margin-bottom:20px;
`

const FButton = styled(FollowButton)`
    margin-left: 10px;
    width: 100px;
`

const Username = styled.h2`
    display: block;
    font-size: 28px;
    font-weight:300;
    line-height:32px;
    text-align:center;
    
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
    justify-content: space-between;
    grid-template-columns: repeat(4,200px);
    grid-auto-rows: 200px;
    grid-template-rows: 200px; 
`;

const HeaderButton = styled(Button)`
    padding: 5px 9px;
    width: auto;
    color: black;
    margin-left:20px;
    background-color: ${props=>props.theme.bgColor};
    border: ${props=>props.theme.boxBorder}
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
                    </HeaderColumn>
                    <HeaderInfo>
                        <HeaderRow>
                            <Username>{username}</Username>
                            {isSelf ? (
                                <>
                                <HeaderButton  onClick={logOut} text="로그아웃"/>
                                <Link to="/accounts/edit">
                                    <Settings/>
                                </Link>
                                </>
                            ) : (
                                <FButton isFollowing={isFollowing} id={id}/>
                            )}
                        </HeaderRow>
                        <Counts>
                            <Count>게시물<CountText text={String(postCount)}/></Count>
                            <Count>팔로워<CountText text={String(followersCount)}/></Count>
                            <Count>팔로우<CountText text={String(followingCount)}/></Count>
                        </Counts>
                        <FullName text={fullName}/>
                        <Bio>{" "}{bio}</Bio>
                    </HeaderInfo>
                </Header>
                    <Post>
                        {posts && posts.map(post => (
                            <SearchedPost
                                key={post.id}
                                id={post.id}
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