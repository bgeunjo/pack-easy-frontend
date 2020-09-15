import React from "react";
import {useMutation} from "react-apollo-hooks"
import {UPLOAD} from "../../Components/Queries"
import EditCode from "../../Components/EditCode/EditCode"
import Preview from "../../Components/Preview"
import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 75vh;
`;

export default() => {
    const context={
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    const title="Hello"
    const content="Words"
    const files=["123","!23"]
    const [uploadMutation] = useMutation(UPLOAD, {
        variables: {
            title,
            content,
            files
        },
        context
    });
    return (
        <Wrapper>
            <EditCode/>
            <Preview/>
        </Wrapper>
        );
}