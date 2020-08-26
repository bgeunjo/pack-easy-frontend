import {Route, Switch, Redirect} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";
import EditProfile from "../Routes/EditProfile";

const LoggedInRoutes = () => {
    return (
        <Switch>
            <Route path="/search" component={Search}/>
            <Route path="/:username" component={Profile}/>
            <Route path="/explore" component={Explore}/>
            <Route path="/:username/edit" component={EditProfile}/>
            <Route path="/" component={Feed}/>
            <Redirect from="*" to="/"/>
        </Switch>
    );
};

const LoggedOutRoutes= () => {
    return (
        <>
                <Route exact path="/" component={Auth}/>
                <Redirect from="*" to="/"/>
        </>
    );
};

const AppRouter = ({isLoggedIn}) => {
       return <Switch>{isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>}</Switch>
};


AppRouter.propTypes= {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;