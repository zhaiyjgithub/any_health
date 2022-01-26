import React, {useContext, useEffect, useState} from "react"
import {DoctorProfile, getDoctorProfile, saveDoctorProfile} from "./GeneralProfileService";
import FormInput from "../../../../components/form/formInput";
import FormRadio from "../../../../components/form/formRadio";
import {DoctorInfoContext} from "../../doctorInfoContext";
import {Gender} from "../../../../utils/enum/enum";
import Button from "../../../../components/buttons/button";

export default function GeneralProfile() {
    const doctorInfo = useContext(DoctorInfoContext)
    const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | undefined>(undefined)

    useEffect(() => {
        getDoctorProfile(doctorInfo.npi, (profile) => {
            setDoctorProfile(profile)
        })
    }, [])

    if (doctorProfile === undefined) {
        return <div className={"animate-pulse relative w-full flex-grow flex items-center justify-center"}>
            <p className={"text-sm text-md text"}>Loading...</p>
        </div>
    }

    const onSave = (profile: DoctorProfile) => {
        saveDoctorProfile(profile, () => {
            alert("save success")
        })
       
    }

    const $doctorName = (<div className={"grid grid-flow-col auto-cols-max gap-x-4"}>
        <FormInput title={"First Name"} placeholder={"First Name"} value={doctorProfile.firstName} onChangeText={(text) => {
            setDoctorProfile({
                ...doctorProfile,
                firstName: text.trim(),
            })
        }}/>

        <FormInput title={"Middle Name"} placeholder={"Middle Name"} value={doctorProfile.midName} onChangeText={(text) => {
            setDoctorProfile({
                ...doctorProfile,
                midName: text.trim(),
            })
        }}/>

        <FormInput title={"Last Name"} placeholder={"Last Name"} value={doctorProfile.lastName} onChangeText={(text) => {
            setDoctorProfile({
                ...doctorProfile,
                lastName: text.trim(),
            })
        }}/>
    </div>)

    const $gender = (
        <div>
            <p className={"inline-block mb-1 text-sm text-base-content font-medium"}>Gender</p>
            <div className={"flex flex-row items-center space-x-4"}>
                <FormRadio title={"Female"} checked={doctorProfile.gender === Gender.Female} onChange={() => {
                    setDoctorProfile({
                        ...doctorProfile,
                        gender: Gender.Female,
                    })
                }} />

                <FormRadio title={"Male"} checked={doctorProfile.gender === Gender.Male} onChange={() => {
                    setDoctorProfile({
                        ...doctorProfile,
                        gender: Gender.Male,
                    })
                }} />

                <FormRadio title={"Trans"} checked={doctorProfile.gender === Gender.Trans} onChange={() => {
                    setDoctorProfile({
                        ...doctorProfile,
                        gender: Gender.Trans,
                    })
                }} />
            </div>
        </div>
    )

    const $specialty = (
        <div className={"w-full grid grid-cols-2 gap-x-4"}>
            <FormInput title={"Specialty"} value={doctorProfile.specialty} placeholder={"Specialty"} onChangeText={(text) => {
                setDoctorProfile({
                    ...doctorProfile,
                    specialty: text.trim(),
                })
            }} />

            <FormInput title={"Sub-Specialty"} value={doctorProfile.subSpecialty} placeholder={"Sub-Specialty"} onChangeText={(text) => {
                setDoctorProfile({
                    ...doctorProfile,
                    subSpecialty: text.trim(),
                })
            }} />
        </div>
    )

    // const $jobTitle = (
    //     <FormInput title={"Job Title"} value={doctorProfile.jobTitle} placeholder={"Job Title"} onChangeText={(text) => {
    //         setDoctorProfile({
    //             ...doctorProfile,
    //             credential: text.trim(),
    //         })
    //     }} />
    // )

    const $contact = (
        <div className={"w-full grid grid-cols-2 gap-x-4"}>
            <FormInput title={"Phone Number"} value={doctorProfile.phone} placeholder={"Phone Number"} onChangeText={(text) => {
                setDoctorProfile({
                    ...doctorProfile,
                    phone: text.trim(),
                })
            }} />

            <FormInput title={"Email"} value={doctorProfile.email} placeholder={"Email"} onChangeText={(text) => {
                setDoctorProfile({
                    ...doctorProfile,
                    email: text.trim(),
                })
            }} />
        </div>
    )

    const $jobDescription = (
        <div className={"w-full grid grid-cols-2 gap-x-4"}>
            <FormInput title={"Job Title"} value={doctorProfile.credential} placeholder={"Job Title"} onChangeText={(text) => {
                setDoctorProfile({
                    ...doctorProfile,
                    jobTitle: text.trim(),
                })
            }} />

            <FormInput title={"Experience"} value={doctorProfile.yearOfExperience} placeholder={"Experience"} onChangeText={(text) => {
                setDoctorProfile({
                    ...doctorProfile,
                    yearOfExperience: text.trim(),
                })
            }} />
        </div>
    )

    const $locationInfo = (<div className={"grid grid-flow-col auto-cols-max gap-x-4"}>
        <FormInput title={"City"} placeholder={"City"} value={doctorProfile.city} onChangeText={(text) => {
            setDoctorProfile({
                ...doctorProfile,
                city: text.trim(),
            })
        }}/>

        <FormInput title={"State"} placeholder={"State"} value={doctorProfile.state} onChangeText={(text) => {
            setDoctorProfile({
                ...doctorProfile,
                state: text.trim(),
            })
        }}/>

        <FormInput title={"Zip"} placeholder={"Zip"} value={doctorProfile.zip} onChangeText={(text) => {
            setDoctorProfile({
                ...doctorProfile,
                zip: text.trim(),
            })
        }}/>
    </div>)

    const $address = (
        <FormInput title={"Address"} placeholder={"Address"} value={doctorProfile.address} onChangeText={(text) => {
            setDoctorProfile({
                ...doctorProfile,
                address: text.trim(),
            })
        }}/>
    )

    const $profile = (
        <div className="w-full">
            <p className={"inline-block mb-1 text-sm text-base-content font-medium"}>My Bio</p>
            <textarea className="h-24 w-full block px-3 py-1.5 text-sm font-medium text-base-content bg-white border border-slate-300 transition ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-focus active:ring-2 active:ring-focus" placeholder="Bio" />
        </div>
    )

    console.log(onSave)

    const $saveButton = (
        <div className={'w-full flex flex-row items-center justify-end'}>
            <Button onClick={() => {
                onSave(doctorProfile)
            }} >
                Save
            </Button>
        </div>
    )
    return (
        <div className={"m-4 w-max flex flex-col space-y-4"}>
            {$doctorName}
            {$gender}
            {$specialty}
            {$jobDescription}
            {$contact}
            {$address}
            {$locationInfo}
            {$profile}
            {$saveButton}
        </div>
    )
}