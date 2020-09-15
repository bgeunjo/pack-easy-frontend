import React from "react";
import {Link} from "react-router-dom"
import styled from "styled-components";
import PropTypes from "prop-types";
import { FullHeart,FullComment } from "./Icons";

const PostLink= styled(Link)`
    display: block;
    height: 100%;
`;

const Overlay = styled.div`
background-color: rgba(0,0,0,0.6);
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-center: center;
opacity: 0;
transition: opacity 0.2s linear;
svg{
    fill:white;
}
`;
const Container = styled.div`
    background-image: url(${props=>props.bg});
    height: 100%;
    background-size: cover;
    cursor: pointer;
    &:hover {
        ${Overlay}{
            opacity:1;
        }
    }
`;

const Number = styled.div`
    color: white;
    display:flex;
    align-items: center;
    &:first-child {
        margin-right: 30px;
    }
`;

const NumberText= styled.span`
    margin-left: 10px;
    font-size:16px;
`;


const SearchedPost= ({id,likeCount,commentCount, file}) => (
    <PostLink to={`/post/`+id}>
        <Container bg={file.url}>
            <Overlay>
                <Number>
                    <FullHeart/>
                    <NumberText>{likeCount}</NumberText>
                </Number>
                <Number>
                    <FullComment/>
                    <NumberText>{commentCount}</NumberText>
                </Number>
            </Overlay>
        </Container>
    </PostLink>
    
);

SearchedPost.propTypes={
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    file: PropTypes.object.isRequired
}

export default SearchedPost;