import {SubUser} from "./components/types";
import {sendRequest} from "../../../utils/http/http";
import {ApiDoctor, ApiSchedule, ApiUser} from "../../../utils/http/api";
import {TimeSlotPerDay} from "../searchDoctor/model/doctor";
import {parseTimeOffset} from "../searchDoctor/service/searchDoctorService";
import {Appointment} from "./types";

export function createSubUser(subUser: SubUser, completeHandler: (isSuccess: boolean) => void) {
    const param = {
        FirstName: subUser.firstName,
        LastName: subUser.lastName,
        Phone: subUser.phone,
        Email: subUser.email,
        Birthday: `${subUser.birthdayYear}-${subUser.birthdayMonth}-${subUser.birthdayDay}`,
        IsLegal: subUser.isLegal,
        Gender: subUser.gender,
        UserID: subUser.userID,
    }
    sendRequest(ApiUser.CreateSubUser, param, () => {
        completeHandler(true)
    }, () => {
        completeHandler(false)
    })
}

export function getSubUsers(userID: number, completeHandler: (list: Array<SubUser>) => void) {
    const param = {
        UserID: userID,
    }
    sendRequest(ApiUser.GetSubUsers, param, (data) => {
        completeHandler(data)
    }, () => {
        completeHandler([])
    })
}

export function updateSubUserPhone(subUserID: number, phone: string, completeHandler: (isSuccess: boolean) => void) {
    const param = {
        UserID: subUserID,
        Phone: phone,
    }
    sendRequest(ApiUser.UpdateSubUserPhone, param, () => {
        completeHandler(true)
    }, () => {
        completeHandler(false)
    })
}

export function getDoctorTimeSlots(npi: number, startDate: string, endDate: string,
    success: (list: Array<TimeSlotPerDay>) => void, fail: () => void
) {
    const param = {
        Npi: npi,
        StartDate: startDate,
        EndDate: endDate,
    }
    sendRequest(ApiDoctor.GetTimeSlots, param, (data) => {
        data.forEach(({date, timeSlots}: TimeSlotPerDay) => {
            const targetDate = new Date(date)
            const initialMinutes = targetDate.getHours() * 60
            timeSlots.forEach((timeSlot) => {
                const currentOffset = initialMinutes + timeSlot.offset
                timeSlot.date = date
                timeSlot.isOverOneDay = currentOffset >= 1440
                timeSlot.dateTime = parseTimeOffset(currentOffset >= 1440 ? currentOffset - 1440 : currentOffset)
            })
        })
        success && success(data)
    }, () => {
        fail && fail()
    })
}

export function addNewAppointment(appointment: Appointment, success: () => void, fail: () => void) {
    sendRequest(ApiSchedule.AddAppointment, appointment, () => {
        success()
    }, () => {
        fail()
    })
}
