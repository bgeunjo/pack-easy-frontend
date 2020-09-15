import React from "react"
import CodeMirrorReact from "./codemirror";
import styled from "styled-components"
const Wrapper=styled.div`
    width:50%
    padding: 3rem;
    height: 100%;
`

const EditCode=() => {
    let options={
        lineNumbers: true,
        highlightFormatting: true,
        tabSize: 2
    };
    return (
        <Wrapper>
            <h1>Hello</h1>
        </Wrapper>
    );
}

export default EditCode;