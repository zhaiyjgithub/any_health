import React, {useEffect, useState} from "react"
import Button from "../../../../../components/buttons/button";
import {ButtonSize, Variant} from "../../../../../components/buttons/enum";
import FormModal from "../../../../../components/modal/formModal";
import {validateNumber} from "../../../../../utils/util/commonTool";

interface IProps {
    phoneNumber: string,
    open: boolean,
    onApply: (phoneNumber: string) => void,
    onClose: () => void
}

export default function PhoneNumberModal(props: IProps) {
    const {open, onApply, onClose} = props
    const [phoneNumber, setPhoneNumber] = useState<string>(props.phoneNumber)
    const [isValid, setIsValid] = useState<boolean>(true)

    useEffect(() => {
        setPhoneNumber(props.phoneNumber)
    }, [props.phoneNumber])

    useEffect(() => {
        if (phoneNumber.length) {
            const ok = validateNumber(phoneNumber)
            setIsValid(ok)
        } else {
            setIsValid(true)
        }
    }, [phoneNumber])

    const $title = (
        <div className={""}>
            <p className={"text-lg text-primary-focus font-semibold"}>Verify your phone number</p>
        </div>
    )
    const $errMsgForPhoneNumber = !isValid ?
        <p className={"text-xs text-red-500 font-semibold mt-1"}>Oops! Try a valid phone number</p> : null
    const $phoneNumberForm = (
        <div className={"w-full"}>
            {$title}
            <p className={"text-gray-600 text-sm"}>{"Patient's PhoneNumber (optional)"}</p>
            <div placeholder={"YYYY"} className={"flex flex-1 border-l mt-1 border mt-4"}>
                <input defaultValue={phoneNumber} onChange={(e) => {
                    setPhoneNumber(e.target.value)
                }} className={"w-full px-2 py-3 text-sm font-primary-focus "}/>
            </div>
            {$errMsgForPhoneNumber}
        </div>
    )

    const onApplyPhoneNumber = () => {
        if (!validateNumber(phoneNumber)) {
            setIsValid(false)
            return
        }
        onApply && onApply(phoneNumber)
    }
    const $onSaveButton = (
        <Button size={ButtonSize.block} onClick={onApplyPhoneNumber}>Continue</Button>
    )
    const $content = (
        <div className={"px-8 pb-8 w-full flex flex-col space-y-8"}>
            {$phoneNumberForm}
            {$onSaveButton}
        </div>
    )

    const $close = (
        <div className={"w-full flex flex-row justify-end mt-2"}>
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
            setPhoneNumber(props.phoneNumber)
        }, 400)
    }

    return (
        <FormModal show={open}>
            {$close}
            {$content}
        </FormModal>
    )
}
