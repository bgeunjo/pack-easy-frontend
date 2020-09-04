import {createGlobalStyle} from "styled-components";
import reset from "styled-reset"


export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto+Condensed&display=swap');
    * {
        box-sizing:border-box;
    }
    body {
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.blackColor};
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        padding-top:140px;
    }
    a{
        color : ${props => props.theme.blueColor};
        text-decoration: none;
    }
    input:focus{
        outline:none;
    }
`;