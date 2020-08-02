import React from "react";
import {withRouter} from "react-router-dom"
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "../../Components/Queries";
import SearchPresenter from "./SearchPresenter"


export default withRouter(({location:{search}}) => {
    const context={
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    const term= search.split("=")[1];
    const {data,loading}=useQuery(SEARCH,{
        skip: term === undefined,
        variables: {
            term
        },
        context
    });
    return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});