import React from "react"
import styled from "styled-components"


const Wrapper=styled.div`
    width: 50%;
    padding :3rem;
`;

export default ({dangerouslySetInnerHTML}) => {
    return <Wrapper dangerouslySetInnerHTML={dangerouslySetInnerHTML}/>
}