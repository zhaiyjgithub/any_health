import React from "react";
import NavBar from "./components/navbar/navbar";
import SideBar from "./components/sidebar/sideBar";
import {Route, Switch} from "react-router-dom";
import {SettingRoute} from "./types";
import MyProfile from "./myProfile";

export default function Setting() {
    const $navbar = (
        <NavBar />
    )

    const $pageView = (
        <div className={"flex-1 px-20"}>
            <Switch>
                <Route path={SettingRoute[0].path} exact component={MyProfile}/>
                <Route path={SettingRoute[1].path} exact component={MyProfile}/>
                <Route path={SettingRoute[2].path} exact component={MyProfile}/>
                <Route path={SettingRoute[3].path} exact component={MyProfile}/>
            </Switch>
        </div>
    )

    return (
        <div className={"w-full h-full bg-white"}>
            {$navbar}
            <div className={"w-full h-full p-14 flex flex-row"}>
                <SideBar />
                {$pageView}
            </div>
        </div>
    )
}