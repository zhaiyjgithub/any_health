import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/views/client/findDoctor/components/filter/calendarCustom.css";
import "leaflet/dist/leaflet.css";
import reportWebVitals from "./reportWebVitals";
import {HashRouter, Route, Switch} from "react-router-dom";
import L from "leaflet";
import icon from "./assets/map/marker-icon.png";
// import iconRetina from "./assets/images/map/marker-icon-2x.png";
import iconShadow from "./assets/map/marker-shadow.png";
// import DoctorAdmin from "./views/doctor/doctorAdmin";
import DoctorCard from "./views/client/doctorCard/doctorCard";
import DoctorListContainer from "./views/client/findDoctor/doctorListContainer";
import CreateAccountPage from "./views/client/user/register/createAccountPage";

let DefaultIcon = L.icon({
    iconUrl: icon,
    // iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path={"/doctor/:name"} component={DoctorCard} />
            <Route exact path={"/search"} component={DoctorListContainer} />
            <Route exact path={"/createuser"} component={CreateAccountPage} />
        </Switch>
    </HashRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
