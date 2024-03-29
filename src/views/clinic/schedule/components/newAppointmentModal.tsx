import React, {useEffect, useState} from "react";
import FormModal from "../../../../components/modal/formModal";
import Button from "../../../../components/buttons/button";
import {Variant} from "../../../../components/buttons/enum";
import FormInput from "../../../../components/form/formInput";

import {getTimeSlots, parseTimeOffset} from "../../../patient/searchDoctor/service/searchDoctorService";
import {TimeSlot} from "../../../patient/searchDoctor/components/doctor/timeslots/timeslots";
import {TimeSlotPerDay} from "../../../patient/searchDoctor/model/doctor";

import moment from "moment";
import {TimeFormat} from "../../../../utils/enum/enum";

interface IProps {
    npi: number,
    show: boolean
    onClose: () => void
    onSave: (timeSlot: TimeSlot, memo: string) => void
}

export default function NewAppointmentModal(props: IProps) {
    const {onClose, show, onSave, npi} = props
    const [timeSlots, setTimeSlots] = useState<Array<TimeSlot>>([])
    const [selectedDate, setSelectedDate] = useState<string>(moment().format(TimeFormat.YYYYMMDD))
    const [errMsg, setErrMsg] = useState<string>("")
    const [memo, setMemo] = useState("")
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | undefined>(undefined)

    useEffect(() => {
        const m = moment(selectedDate, TimeFormat.YYYYMMDD)
        if (m.isValid() &&
            m.isSameOrAfter(moment(), "day") &&
            m.isBefore(moment().add(12, "months"), "day")
        ) {
            setErrMsg("")
            const startDate = m.utc()
                .toDate()
                .toISOString()
            const endDate = startDate
            getTimeSlots(npi, startDate, endDate, (list) => {
                if (list.length) {
                    setTimeSlots(list[0].timeSlots)
                }
            }, () => {
                //
            })
        } else {
            setErrMsg("Appointment date must be equal or greater than today!")
        }
    }, [selectedDate])

    const $closeButton = (
        <div className={"w-full flex flex-row justify-end mt-2"}>
            <Button onClick={() => {
                onClose && onClose()
            }} variant={Variant.float} >
                <i className="fas fa-times text-xl" />
            </Button>
        </div>
    )

    const $title = (
        <p className={"text-lg font-bold text-primary-focus"}>Add New Appointment</p>
    )

    const getTimeSlotsByNpi = (npi: number, startDate: string) => {
        const endDate = startDate
        getTimeSlots(npi, startDate, endDate, (list) => {
            if (!list.length) {
                console.log("No more record")
                return
            }
            const perDay: TimeSlotPerDay = list[0]
            const {date, timeSlots} = perDay
            const targetDate = moment(date)
            const initialMinutes = targetDate.hours() * 60
            timeSlots.forEach((timeSlot) => {
                const currentOffset = initialMinutes + timeSlot.offset
                timeSlot.isOverOneDay = currentOffset >= 1440
                timeSlot.date = date
                timeSlot.dateTime = parseTimeOffset(currentOffset >= 1440 ? currentOffset - 1440 : currentOffset)
            })
            setTimeSlots(timeSlots)
        }, () => {
            //
        })
    }

    console.log(getTimeSlotsByNpi)

    const $dateInput = (
        <FormInput errMsg={errMsg} type={"date"} title={"Appointment Date"} value={selectedDate} onChangeText={(text) => {
            setSelectedDate(text)
        }}
        min={moment().format(TimeFormat.YYYYMMDD)}
        />
    )

    const $overOneDayTag = (
        <p className={"bg-pink-500 p-px rounded-full text-white absolute text-xs -right-1.5 -bottom-1.5"}>+1</p>
    )

    const $timeSlot = (timeSlot: TimeSlot, idx: number) => {
        const isSelected = selectedTimeSlot && selectedTimeSlot.dateTime === timeSlot.dateTime
        return (
            <button type={"button"} className={`relative w-full py-2 px-2 bg-primary hover:bg-primary-focus ${isSelected ? "bg-primary-focus text-focus" : ""} text-primary-focus hover:text-focus leading-snug text-sm font-medium`} key={idx} onClick={() => {
                setSelectedTimeSlot(timeSlot)
            }} >
                {timeSlot.dateTime}
                {timeSlot.isOverOneDay ? $overOneDayTag : null}
            </button>
        )
    }

    const $timeSlotsList = (
        <div className={"grid grid-cols-4 2xl:grid-cols-5 gap-2 h-56 overflow-scroll"}>
            {timeSlots.map((timeslot, idx) => {
                return $timeSlot(timeslot, idx)
            })}
        </div>
    )

    const $memoView = (
        <div>
            <p className={"block text-base font-medium text-base-content"}>Memo</p>
            <textarea value={memo} onChange={(e) => {
                setMemo(e.target.value)
            }} placeholder={"Your memo..."} className={"w-full resize-none h-20 border text-base-content"}/>
        </div>
    )

    const $saveButton = (
        <Button onClick={() => {
            selectedTimeSlot && onSave(selectedTimeSlot, memo)
        }}>
            Save
        </Button>
    )

    const $actionView = (
        <div className={"w-full flex flex-row-reverse"}>
            {$saveButton}
        </div>
    )

    const $contentView = (
        <div className={"flex-1 px-8 space-y-4 pb-8"}>
            {$title}
            {$dateInput}
            {$timeSlotsList}
            {$memoView}
            {$actionView}
        </div>
    )

    return (
        <FormModal show={show}>
            {$closeButton}
            {$contentView}
        </FormModal>
    )
}
