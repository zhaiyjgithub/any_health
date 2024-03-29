import React, {useState} from "react"
import Button from "../../../../../components/buttons/button";
import {ButtonSize, Variant} from "../../../../../components/buttons/enum";
import moment from "moment";
import FormRadio from "../../../../../components/form/formRadio";
import {SubUser} from "../types";
import FormModal from "../../../../../components/modal/formModal";

interface IProps {
    open: boolean,
    onApply: (profile?: SubUser) => void,
    onClose: () => void
}

export default function NewSubPatientModal(props: IProps) {
    const {open, onApply, onClose} = props
    const [profile, setProfile] = useState<SubUser>({
        firstName: "",
        lastName: "",
        birthdayMonth: "",
        birthdayDay: "",
        birthdayYear: "",
        gender: "",
        email: "",
        phone: "",
        isLegal: undefined,
        userID: 0,
    })
    const [check, setCheck] = useState<{
        name: boolean,
        birthday: boolean,
        gender: boolean,
        legal: boolean,
    }>({
        name: false,
        birthday: false,
        gender: false,
        legal: false,
    })

    const isNameInvalid = () => {
        return check.name && (!profile.firstName.length || !profile.lastName.length)
    }
    const $errMsgForName = isNameInvalid() ?
        <p className={"text-xs text-red-500 font-medium"}>{"Please type a name"}</p> : null
    const $nameForms = (
        <div>
            <p className={"font-semibold text-primary-focus text-sm"}>{"Patient's name"}</p>
            <div className={"w-full flex flex-row border"}>
                <div className={"flex flex-1"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            name: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            firstName: e.target.value,
                        })
                    }} placeholder={"First"} className={"w-full px-2 py-3 text-sm font-primary-focus "}/>
                </div>
                <div className={"flex flex-1 border-l"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            name: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            lastName: e.target.value,
                        })
                    }} placeholder={"Last"} className={"w-full px-2 py-3 text-sm font-primary-focus "}/>
                </div>
            </div>
            {$errMsgForName}
        </div>
    )

    const isBirthdayInvalid = () => {
        const date = `${profile.birthdayYear}/${profile.birthdayMonth}/${profile.birthdayDay}`
        return check.birthday && !moment(date).isValid()
    }
    const $errMsgForBirthday = isBirthdayInvalid() ?
        <p className={"text-xs text-red-500 font-medium"}>Oops! Try a valid date.</p> : null
    const $dobForms = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-sm"}>{"Patient's date of birth"}</p>
            <div className={"w-full flex flex-row border"}>
                <div className={"flex flex-1"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            birthday: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            birthdayMonth: e.target.value,
                        })
                    }} placeholder={"MM"} className={"w-full px-2 py-3 text-sm font-primary-focus "}/>
                </div>
                <div className={"flex flex-1"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            birthday: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            birthdayDay: e.target.value,
                        })
                    }} placeholder={"DD"} className={"w-full px-2 py-3 text-sm font-primary-focus border-l"}/>
                </div>
                <div className={"flex flex-1 border-l"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            birthday: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            birthdayYear: e.target.value,
                        })
                    }} placeholder={"YYYY"} className={"w-full px-2 py-3 text-sm font-primary-focus "}/>
                </div>
            </div>
            {$errMsgForBirthday}
        </div>
    )

    const $emailForm = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-sm"}>{"Patient's email (optional)"}</p>
            <div placeholder={"YYYY"} className={"flex flex-1 border-l mt-1 border"}>
                <input onChange={(e) => {
                    setProfile({
                        ...profile,
                        email: e.target.value,
                    })
                }} className={"w-full px-2 py-3 text-sm font-primary-focus "}/>
            </div>
        </div>
    )

    const $errMsgForLegalOption = check.legal && profile.isLegal === undefined ?
        <p className={"text-xs text-red-500 font-medium"}>Please confirm whether you are the parent or legal guardian of
            the patient.</p> : null
    const $newPatientOptionView = (
        <div className={"w-full"}>
            <p className={"text-sm text-primary-focus font-semibold"}>Are you the parent or legal guardian of this
                patient?</p>
            <div className={"flex flex-row items-center justify-between border border-base-300 mt-1 bg-white"}>
                <div className={"px-3 py-2 flex flex-1 flex-row border-l"}>
                    <FormRadio key={4} title={"Yes"} checked={profile.isLegal === true} onChange={() => {
                        setProfile({
                            ...profile,
                            isLegal: true,
                        })
                    }}/>
                </div>
                <div className={"px-3 py-2 flex flex-1 flex-row border-l"}>
                    <FormRadio key={3} title={"No"} checked={profile.isLegal === false} onChange={() => {
                        setProfile({
                            ...profile,
                            isLegal: false,
                        })
                    }}/>
                </div>
            </div>
            {$errMsgForLegalOption}
        </div>
    )

    const $errMsgForGenderOption = check.gender && profile.gender === "" ?
        <p className={"text-xs text-red-500 font-medium"}>Please select a gender.</p> : null
    const $genderForms = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-sm"}>{"Patient's gender"}</p>
            <div className={"w-full flex flex-row items-center bg-white border"}>
                <div className={"px-3 py-2 flex flex-1 flex-row"}>
                    <FormRadio titleClassName={"text-sm"} key={3} title={"Male"} checked={profile.gender === "F"}
                        onChange={() => {
                            setProfile({
                                ...profile,
                                gender: "M",
                            })
                            setCheck({
                                ...check,
                                gender: true,
                            })
                        }}/>
                </div>
                <div className={"px-3 py-2 flex flex-1 flex-row border-l"}>
                    <FormRadio titleClassName={"text-sm"} key={4} title={"Female"} checked={profile.gender === "M"}
                        onChange={() => {
                            setProfile({
                                ...profile,
                                gender: "F",
                            })
                            setCheck({
                                ...check,
                                gender: true,
                            })
                        }}/>
                </div>
            </div>
            {$errMsgForGenderOption}
        </div>
    )

    const onSaveProfile = () => {
        if (!profile.firstName.length ||
            !profile.lastName.length ||
            !profile.birthdayMonth ||
            !profile.birthdayDay ||
            !profile.birthdayYear ||
            !profile.isLegal ||
            !profile.gender.length
        ) {
            setCheck({
                name: true,
                birthday: true,
                legal: true,
                gender: true,
            })
            return
        }
        onApply && onApply(profile)
    }
    const $bookButton = (
        <Button size={ButtonSize.block} onClick={onSaveProfile}>Continue</Button>
    )

    const $title = (
        <p className={"text-primary-focus text-2xl font-bold"}>Subpatient Form</p>
    )
    const $content = (
        <div className={"px-8 pb-8 w-full flex flex-col space-y-8"}>
            {$title}
            {$nameForms}
            {$emailForm}
            {$dobForms}
            {$newPatientOptionView}
            {$genderForms}
            {$bookButton}
        </div>
    )

    const $close = (
        <div className={"w-full flex flex-row justify-end mt-4"}>
            <Button onClick={() => {
                onClose && onClose()
                resetState()
            }} variant={Variant.float}>
                <i className="fas fa-times text-xl"/>
            </Button>
        </div>
    )

    const resetState = () => {
        setTimeout(() => {
            setProfile({
                firstName: "",
                lastName: "",
                birthdayMonth: "",
                birthdayDay: "",
                birthdayYear: "",
                gender: "",
                email: "",
                phone: "",
                isLegal: undefined,
                userID: 0,
            })
            setCheck({
                name: false,
                birthday: false,
                gender: false,
                legal: false,
            })
        }, 500)
    }

    return (
        <FormModal show={open}>
            {$close}
            {$content}
        </FormModal>
    )
}
