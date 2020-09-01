import {Route, Switch, Redirect} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";
import Post from "../Routes/Post"
import EditProfile from "../Routes/EditProfile";

const LoggedInRoutes = () => {
    return (
        <Switch>
            <Route path="/search" component={Search}/>
            <Route exact path="/accounts/edit" component={EditProfile}/>
            <Route exact path="/:username" component={Profile}/>
            <Route exact path="/post/:id" component={Post}/>
            <Route exact path="/" component={Feed}/>
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