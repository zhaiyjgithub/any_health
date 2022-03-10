import React from "react";
import Modal from "../../../../../components/modal/modal";
import Button from "../../../../../components/buttons/button";
import {DoctorInfo} from "../../model/doctor";
import {ButtonType} from "../../../../../components/buttons/enum";
import TimeSlotsPerDay from "./timeSlotsPerDay";
import {$iconDefaultDoctor} from "../../assets/assets";

interface IProps {
    show: boolean,
    doctorInfo: DoctorInfo,
    onClose: () => void
}

export default function AllAvailableTimeSlots(props: IProps) {
    const { show, doctorInfo, onClose } = props
    const $closeButton = (
        <div className={"w-full flex flex-row items-center justify-end"}>
            <Button type={ButtonType.floatIcon} onClick={() => {
                onClose && onClose()
            }} >
                <i className="text-primary-focus text-lg fas fa-times"></i>
            </Button>
        </div>
    )

    const $avatar = (
        <div className={"h-24 w-24 rounded-full bg-red-300 flex-none"} >
            {$iconDefaultDoctor}
        </div>
    )

    const $review = (
        <div className={"flex flex-row items-center space-x-1 mt-1"}>
            <i className="fas fa-star text-pink-400 w-4 h-4"/>
            <p className={"text-pink-400 text-sm font-medium leading-snug"}>4.69</p>
            <p className={"text-gray-400 text-sm font-medium leading-snug"}>(273)</p>
        </div>
    )

    const doctorName = `${doctorInfo.namePrefix} ${doctorInfo.fullName} ${doctorInfo.jobTitle}`
    const $info = (
        <div className={"flex-1"}>
            <p className={"text-base text-primary-focus font-bold leading-snug"}>{doctorName}</p>
            <p className={"text-sm text-primary-focus font-medium leading-snug text-left"}>{doctorInfo.specialty}</p>
            <p className={"text-sm text-primary-focus leading-snug text-left"}>{doctorInfo.address}</p>
            {$review}
        </div>
    )
    
    const $basicInfo = (
        <div className={"w-full px-8 flex flex-row items-center space-x-6"}>
            {$avatar}
            {$info}
        </div>
    )

    const $timeSlotsView = (
        <TimeSlotsPerDay timeSlotsPerDay={doctorInfo.timeSlotsPerDay} doctorName={doctorName} />
    )
    return (
        <Modal isOpen={show} >
            {$closeButton}
            {$basicInfo}
            {$timeSlotsView}
        </Modal>
    )
}