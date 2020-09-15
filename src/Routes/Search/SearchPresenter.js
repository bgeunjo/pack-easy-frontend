import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText"
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard"
import SearchedPost from "../../Components/SearchedPost"

const Wrapper = styled.div`
    ${props=>props.theme.Wrapper}
    height: 70vh;
    text-align: center;
`;
const Section = styled.div`
    display: grid;
    grid-gap:25px;
    grid-template-columns: repeat(4,160px);
    grid-auto-rows: 160px;
    grid-template-rows: 160px; 
`;

const PostSection = styled(Section)`
    grid-template-columns: repeat(4,292px);
    grid-auto-rows: 292px;
    grid-template-rows: 292px; 
`;
const SearchPresenter = ({searchTerm, loading, data}) => {
    if(searchTerm === undefined){
        return (
            <Wrapper>
                <FatText text="Search for something"/>
            </Wrapper>
        );
    } else if(loading===true){
        return (
            <Wrapper>
                <Loader/>
            </Wrapper>
        );
    } else if (data && data.searchByUser && data.searchByPost) {
        return (
            <Wrapper>
                <Section>
                    {data.searchByUser.length ===0 ? (
                        <FatText text="No Users Found" />
                    ) : (
                        data.searchByUser.map(user => (
                            <UserCard
                                key={user.id}
                                id={user.id}
                                username={user.username}
                                isFollowing={user.isFollowing}
                                url={user.avatar}
                                isSelf={user.isSelf}
                            />
                        ))
                    )}
                </Section>
                <PostSection>
                    {data.searchByPost.length===0 ? (
                        <FatText text="No Posts Found" />
                    ) : (
                        data.searchByPost.map(post=>(
                            <SearchedPost
                                key={post.id} 
                                likeCount={post.likeCount}
                                commentCount={post.commentCount}
                                file={post.files[0]}
                            />
                        ))
                    )}
                </PostSection>
            </Wrapper>
        );
    } else{
        return "hi";
    }
};

SearchPresenter.propTypes= {
    searchTerm : PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;