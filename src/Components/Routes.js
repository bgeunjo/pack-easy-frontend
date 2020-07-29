import {Route, Switch} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";

const LoggedInRoutes = () => {
    return (
        <Switch>
            <Route path="/" component={Feed}/>
            <Route path="/explore" component={Explore}/>
            <Route path="/search" component={Search}/>
            <Route path="/:username" component={Profile}/>
        </Switch>
    );
};

const LoggedOutRoutes= () => {
    return (
        <>
                <Route exact path="/" component={Auth}/>
        </>
    );
};

const AppRouter = ({isLoggedIn}) => {
        console.log(localStorage.getItem("token"))
       return <Switch>{isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>}</Switch>
};


AppRouter.propTypes= {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;