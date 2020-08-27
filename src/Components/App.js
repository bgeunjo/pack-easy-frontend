import React from "react";
import styled,{ ThemeProvider} from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import {BrowerRouter} from "react-router-dom";
import Routes from "./Routes"
import { useQuery } from "react-apollo-hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import Header from "./Header"
import {QUERY} from "./Queries"
const Wrapper= styled.div`
  margin: 0 auto;
  max-width: ${props=>props.theme.maxWidth};
  width: 100%;
  `;
export default () => {
  const{
    data: {isLoggedIn}
  } = useQuery(QUERY);
  //const [isLoggedInS,setIsLoggedInS] = useState(false);
  //let data=useQuery(QUERY);
  //useEffect(()=>{
  //  data.isLoggedIn=isLoggedInS;
  //  return setIsLoggedInS(true);
  //},[data.isLoggedIn,isLoggedInS]);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <BrowerRouter>
          <>
            {isLoggedIn && <Header/>}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer/>
            </Wrapper>
          </>
        </BrowerRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
      </>
    </ThemeProvider>
  );
};