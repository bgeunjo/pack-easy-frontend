import React from "react";
import styled,{ ThemeProvider} from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from "./Routes"
import { useQuery } from "react-apollo-hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import Header from "./Header"
import {QUERY} from "./Queries"

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
        <Router>
          <>
            {isLoggedIn && <Header/>}
            <>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer/>
            </>
          </>
        </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
      </>
    </ThemeProvider>
  );
};