import React, {useEffect, useState} from 'react'
import {DoctorProfile, getDoctorProfile} from "./GeneralProfileService";
import {testNpi} from "../../../../utils/constant/Enum";

const GeneralProfile: React.FC = () => {
    const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | undefined>(undefined)

    useEffect(() => {
        getDoctorProfile(testNpi, (profile) => {
            setDoctorProfile(profile)
        })
    }, [])

    if (doctorProfile === undefined) {
        return <div className={'animate-pulse relative w-full flex-grow flex items-center justify-center'}>
            <p className={'text-sm text-md text'}>Loading...</p>
        </div>
    }

    return (
        <div className={'w-full bg-white mx-4 my-4 relative'}>
            <div className={'grid grid-flow-row auto-rows-max gap-y-4 w-max'}>
                <div className={'grid grid-flow-col auto-cols-max gap-x-4'}>
                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'First Name'}</p>
                        <input value={doctorProfile.firstName} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                firstName: e.target.value
                            })
                        }} placeholder={'First Name'} className={'mt-1 w-48 p-2 text-sm border border-gray-300 rounded'}/>
                    </div>

                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Middle Name'}</p>
                        <input maxLength={1} value={doctorProfile.midName} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                midName: e.target.value
                            })
                        }} placeholder={'Middle Name'} className={' mt-1 w-32 p-2 text-sm border border-gray-300 rounded'}/>
                    </div>

                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Last Name'}</p>
                        <input value={doctorProfile.lastName} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                lastName: e.target.value
                            })
                        }} placeholder={'Last Name'} className={'mt-1 w-48 p-2 text-sm border border-gray-300 rounded'}/>
                    </div>
                </div>

                <div className={'grid grid-flow-col auto-cols-max gap-x-4'}>
                    <label className="inline-flex items-center ">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" checked />
                        <span
                            className="ml-2 text-gray-700">Female
                        </span>
                    </label>

                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" checked />
                        <span
                            className="ml-2 text-gray-700">Male
                        </span>
                    </label>

                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" checked />
                        <span
                            className="ml-2 text-gray-700">Trans
                        </span>
                    </label>
                </div>

                <div className={'w-full grid grid-cols-2 gap-x-4'}>
                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Specialty'}</p>
                        <input value={doctorProfile.specialty} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                specialty: e.target.value
                            })
                        }} placeholder={'Specialty'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                    </div>

                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Sub-Specialty'}</p>
                        <input value={doctorProfile.subSpecialty} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                subSpecialty: e.target.value
                            })
                        }} placeholder={'Sub-Specialty'} className={' mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                    </div>
                </div>

                {/*Gender*/}
                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Job Title'}</p>
                    <input value={doctorProfile.credential} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            jobTitle: e.target.value
                        })
                    }} placeholder={'Job Title'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Phone Number'}</p>
                    <input value={doctorProfile.phone} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            phone: e.target.value
                        })
                    }} placeholder={'Phone Number'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Email'}</p>
                    <input value={doctorProfile.email} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            email: e.target.value
                        })
                    }} placeholder={'Email'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Address'}</p>
                    <input value={doctorProfile.address} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            address: e.target.value
                        })
                    }} placeholder={'Address'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'City'}</p>
                    <input value={doctorProfile.city} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            city: e.target.value
                        })
                    }} placeholder={'City'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'State'}</p>
                    <input value={doctorProfile.state} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            state: e.target.value
                        })
                    }} placeholder={'State'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Zip'}</p>
                    <input value={doctorProfile.zip} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            zip: e.target.value
                        })
                    }} placeholder={'Zip'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Country'}</p>
                    <input value={doctorProfile.country} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            country: e.target.value
                        })
                    }} placeholder={'Country'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Experience'}</p>
                    <input value={doctorProfile.yearOfExperience} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            yearOfExperience: e.target.value
                        })
                    }}  placeholder={'Experience'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'My Profile'}</p>
                    <textarea value={doctorProfile.summary} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            summary: e.target.value
                        })
                    }} placeholder={'My Profile'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>
            </div>

            <div className={'py-4 bg-white fixed left-48 bottom-0 right-0 border-t flex flex-row items-center justify-end pr-16'}>
                <button onClick={() => {

                }} type={'button'} className={'rounded bg-primary hover:bg-primary-focus'}>
                    <p className={'px-4 py-2 font-medium text-sm text-white'}>Save</p>
                </button>


            </div>
        </div>
    )
}

export default GeneralProfile