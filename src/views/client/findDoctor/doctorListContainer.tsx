import React, {useContext} from "react";
import {SearchFilterContext, SearchFilterProvider} from "./searchFilterProvider";
import SearchDoctor from "./searchDoctor";

export default function DoctorListContainer() {
    const {state, dispatch} = useContext(SearchFilterContext)
    return <SearchFilterProvider value={{state, dispatch}}>
        <SearchDoctor />
    </SearchFilterProvider>
}