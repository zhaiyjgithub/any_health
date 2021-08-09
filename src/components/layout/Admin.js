import NavBar from "../navBar/NavBar";
import React from "react";
import Appointment from "../../views/appointment/Appointment";
import DoctorList from "../../views/finder/DoctorList";

function Admin() {
	return (
		<div className={'w-screen h-screen bg-white'}>
			<NavBar />
			<div className={'w-full h-full flex flex-row justify-center bg-white px-4 md:px-20'}>
				<div className={'h-full w-full md:w-1/2 '}>
					<DoctorList />
				</div>
				<div className={'hidden md:flex md:w-1/2 h-full overflow-scroll '}>
					<Appointment />
				</div>
			</div>
		</div>
	)
}

export default Admin
