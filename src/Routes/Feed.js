import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post"
import {SEE_FEED} from "../Components/Queries"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 75vh;
`;

export default  ()=> {
    const context={
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    const {data,loading} =  useQuery(SEE_FEED,{
        context
    });
    return  <Wrapper>
                    <Helmet>
                        <title>CANTBEGOSU</title>
                    </Helmet>
                {loading && <Loader/>}
                {!loading && data && data.seeFeed && data.seeFeed.map(post => 
                    <Post 
                        key={post.id}
                        id={post.id} 
                        user={post.user} 
                        files={post.files}
                        likeCount={post.likeCount}
                        isLiked={post.isLiked}
                        comments={post.comments}
                        createdAt={post.createdAt}
                        location={post.location}
                        caption={post.caption}
                        />)}
            </Wrapper>
}