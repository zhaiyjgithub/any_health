import moment from "moment";
import {TimeFormat} from "../../../../utils/enum/enum";
import {ApiSchedule} from "../../../../utils/http/api";
import {convertHHmmStringToHHmm} from "../../../../utils/util/dateTool";
import {sendRequest} from "../../../../utils/http/http";
import {DropDownItem} from "../../../../components/form/dropDown";

export interface WorkDaySetting {
    npi: number
    durationPerSlot: number,
    numberPerSlot: number,

    mondayAmIsEnable: boolean,
    mondayAmStartTime: string,
    mondayAmStartTimeOffset: number
    mondayAmEndTime: string,
    mondayAmEndTimeOffset: number,
    mondayAmAppointmentType: number,
    mondayPmIsEnable: boolean,
    mondayPmStartTime: string,
    mondayPmStartTimeOffset: number,
    mondayPmEndTime: string,
    mondayPmEndTimeOffset: number,
    mondayPmAppointmentType: number,

    tuesdayAmIsEnable: boolean,
    tuesdayAmStartTime: string,
    tuesdayAmStartTimeOffset: number
    tuesdayAmEndTime: string,
    tuesdayAmEndTimeOffset: number,
    tuesdayAmAppointmentType: number,
    tuesdayPmIsEnable: boolean,
    tuesdayPmStartTime: string,
    tuesdayPmStartTimeOffset: number,
    tuesdayPmEndTime: string,
    tuesdayPmEndTimeOffset: number,
    tuesdayPmAppointmentType: number,

    wednesdayAmIsEnable: boolean,
    wednesdayAmStartTime: string,
    wednesdayAmStartTimeOffset: number
    wednesdayAmEndTime: string,
    wednesdayAmEndTimeOffset: number,
    wednesdayAmAppointmentType: number,
    wednesdayPmIsEnable: boolean,
    wednesdayPmStartTime: string,
    wednesdayPmStartTimeOffset: number,
    wednesdayPmEndTime: string,
    wednesdayPmEndTimeOffset: number,
    wednesdayPmAppointmentType: number,

    thursdayAmIsEnable: boolean,
    thursdayAmStartTime: string,
    thursdayAmStartTimeOffset: number
    thursdayAmEndTime: string,
    thursdayAmEndTimeOffset: number,
    thursdayAmAppointmentType: number,
    thursdayPmIsEnable: boolean,
    thursdayPmStartTime: string,
    thursdayPmStartTimeOffset: number,
    thursdayPmEndTime: string,
    thursdayPmEndTimeOffset: number,
    thursdayPmAppointmentType: number,

    fridayAmIsEnable: boolean,
    fridayAmStartTime: string,
    fridayAmStartTimeOffset: number
    fridayAmEndTime: string,
    fridayAmEndTimeOffset: number,
    fridayAmAppointmentType: number,
    fridayPmIsEnable: boolean,
    fridayPmStartTime: string,
    fridayPmStartTimeOffset: number,
    fridayPmEndTime: string,
    fridayPmEndTimeOffset: number,
    fridayPmAppointmentType: number,

    saturdayAmIsEnable: boolean,
    saturdayAmStartTime: string,
    saturdayAmStartTimeOffset: number
    saturdayAmEndTime: string,
    saturdayAmEndTimeOffset: number,
    saturdayAmAppointmentType: number,
    saturdayPmIsEnable: boolean,
    saturdayPmStartTime: string,
    saturdayPmStartTimeOffset: number,
    saturdayPmEndTime: string,
    saturdayPmEndTimeOffset: number,
    saturdayPmAppointmentType: number,

    sundayAmIsEnable: boolean,
    sundayAmStartTime: string,
    sundayAmStartTimeOffset: number
    sundayAmEndTime: string,
    sundayAmEndTimeOffset: number,
    sundayAmAppointmentType: number,
    sundayPmIsEnable: boolean,
    sundayPmStartTime: string,
    sundayPmStartTimeOffset: number,
    sundayPmEndTime: string,
    sundayPmEndTimeOffset: number,
    sundayPmAppointmentType: number,
}

export enum DateTimePoint {
    StartTime= 0,
    EndTime= 1,
}

export const calcDropdownListDataSource = (startTime: string, endTime: string, duration: number) => {
    const regx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!regx.test(startTime) || !regx.test(endTime)) {
        console.error("start time or end time format error", startTime, endTime)
        return []
    }
    const startMinutes = parseInt(startTime.slice(0, 2)) * 60 + parseInt(startTime.slice(3, 4))
    const endMinutes = parseInt(endTime.slice(0, 2)) * 60 + parseInt(endTime.slice(3, 4))
    const list = []
    for (let i = startMinutes; i <= endMinutes; i += duration) {
        const dateTime = convertMinutesToDateTimeString(i)
        list.push({name: dateTime, id: dateTime} as DropDownItem)
    }
    return list
}

export const convertMinutesToDateTimeString = (minutes: number) => {
    const hour = parseInt((minutes / 60) + "")
    const min = parseInt((minutes % 60) + "")
    return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min)
}

export const getNextEndTimeRange = (startTime: string, dateTimeDataSource: Array<DropDownItem>) => {
    const prefix = "2000-01-01 "
    const startTimeMoment = moment(prefix + startTime, TimeFormat.YYYYMMDDHHmm)
    return dateTimeDataSource.filter(({name}) => {
        const endTimeMoment = moment(prefix + name, TimeFormat.YYYYMMDDHHmm)
        return endTimeMoment.isAfter(startTimeMoment)
    })
}

// about update settings
export const updateScheduleSettings = (settings: WorkDaySetting, success: () => void, fail: () => void) => {
    const dateTime24HSettings = convertLocalPmTime12HTo24H(settings)
    const utcSettings = convertLocalStartDateTimeToUTCStartDateTimeOffset(dateTime24HSettings)
    const param = convertDateTimeToDateTimeOffset(utcSettings)
    sendRequest(ApiSchedule.SetScheduleSettings, param, () => {
        success && success()
    }, () => {
        fail && fail()
    })
}

const localDateTimeToUTCDateTimeOffset = (hhmm: string) => {
    const {hour, min} = convertHHmmStringToHHmm(hhmm)
    const d = (new Date(2000, 0, 1, hour, min, 0, 0))
    const utcHour = d.getUTCHours()
    const utcMin = d.getUTCMinutes()
    return (utcHour * 60 + utcMin)
}

const dateTime12HTo24H = (dateTime12H: string) => {
    const {hour, min} = convertHHmmStringToHHmm(dateTime12H)
    return `${hour + 12}:${(min < 10 ? "0" + min : min)}`
}

export const convertLocalPmTime12HTo24H = (settings: WorkDaySetting) => {
    return {
        ...settings,
        mondayPmStartTime: dateTime12HTo24H(settings.mondayPmStartTime),
        tuesdayPmStartTime: dateTime12HTo24H(settings.tuesdayPmStartTime),
        wednesdayPmStartTime: dateTime12HTo24H(settings.wednesdayPmStartTime),
        thursdayPmStartTime: dateTime12HTo24H(settings.thursdayPmStartTime),
        fridayPmStartTime: dateTime12HTo24H(settings.fridayPmStartTime),
        saturdayPmStartTime: dateTime12HTo24H(settings.saturdayPmStartTime),
        sundayPmStartTime: dateTime12HTo24H(settings.sundayPmStartTime),

        mondayPmEndTime: dateTime12HTo24H(settings.mondayPmEndTime),
        tuesdayPmEndTime: dateTime12HTo24H(settings.tuesdayPmEndTime),
        wednesdayPmEndTime: dateTime12HTo24H(settings.wednesdayPmEndTime),
        thursdayPmEndTime: dateTime12HTo24H(settings.thursdayPmEndTime),
        fridayPmEndTime: dateTime12HTo24H(settings.fridayPmEndTime),
        saturdayPmEndTime: dateTime12HTo24H(settings.saturdayPmEndTime),
        sundayPmEndTime: dateTime12HTo24H(settings.sundayPmEndTime),
    }
}

export const convertLocalStartDateTimeToUTCStartDateTimeOffset = (settings: WorkDaySetting) => {
    return {
        ...settings,
        mondayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.mondayAmStartTime),
        tuesdayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.tuesdayAmStartTime),
        wednesdayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.wednesdayAmStartTime),
        thursdayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.thursdayAmStartTime),
        fridayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.fridayAmStartTime),
        saturdayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.saturdayAmStartTime),
        sundayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.sundayAmStartTime),
    }
}

export const convertDateTimeStringToMinutes = (dateTime: string) => {
    return parseInt(dateTime.slice(0, 2)) * 60 + parseInt(dateTime.slice(3, 4))
}

const calcDateTimeOffset = (endTime: string, startTime: string) => {
    return convertDateTimeStringToMinutes(endTime) - convertDateTimeStringToMinutes(startTime)
}

export const convertDateTimeToDateTimeOffset = (settings: WorkDaySetting) => {
    return {
        ...settings,
        mondayAmEndTimeOffset: calcDateTimeOffset(settings.mondayAmEndTime, settings.mondayAmStartTime),
        mondayPmStartTimeOffset: calcDateTimeOffset(settings.mondayPmStartTime, settings.mondayAmStartTime),
        mondayPmEndTimeOffset: calcDateTimeOffset(settings.mondayPmEndTime, settings.mondayPmStartTime),

        tuesdayAmEndTimeOffset: calcDateTimeOffset(settings.tuesdayAmEndTime, settings.tuesdayAmStartTime),
        tuesdayPmStartTimeOffset: calcDateTimeOffset(settings.tuesdayPmStartTime, settings.tuesdayAmStartTime),
        tuesdayPmEndTimeOffset: calcDateTimeOffset(settings.tuesdayPmEndTime, settings.tuesdayPmStartTime),

        wednesdayAmEndTimeOffset: calcDateTimeOffset(settings.wednesdayAmEndTime, settings.wednesdayAmStartTime),
        wednesdayPmStartTimeOffset: calcDateTimeOffset(settings.wednesdayPmStartTime, settings.wednesdayAmStartTime),
        wednesdayPmEndTimeOffset: calcDateTimeOffset(settings.wednesdayPmEndTime, settings.wednesdayPmStartTime),

        thursdayAmEndTimeOffset: calcDateTimeOffset(settings.thursdayAmEndTime, settings.thursdayAmStartTime),
        thursdayPmStartTimeOffset: calcDateTimeOffset(settings.thursdayPmStartTime, settings.thursdayAmStartTime),
        thursdayPmEndTimeOffset: calcDateTimeOffset(settings.thursdayPmEndTime, settings.thursdayPmStartTime),

        fridayAmEndTimeOffset: calcDateTimeOffset(settings.fridayAmEndTime, settings.fridayAmStartTime),
        fridayPmStartTimeOffset: calcDateTimeOffset(settings.fridayPmStartTime, settings.fridayAmStartTime),
        fridayPmEndTimeOffset: calcDateTimeOffset(settings.fridayPmEndTime, settings.fridayPmStartTime),

        saturdayAmEndTimeOffset: calcDateTimeOffset(settings.saturdayAmEndTime, settings.saturdayAmStartTime),
        saturdayPmStartTimeOffset: calcDateTimeOffset(settings.saturdayPmStartTime, settings.saturdayAmStartTime),
        saturdayPmEndTimeOffset: calcDateTimeOffset(settings.saturdayPmEndTime, settings.saturdayPmStartTime),

        sundayAmEndTimeOffset: calcDateTimeOffset(settings.sundayAmEndTime, settings.sundayAmStartTime),
        sundayPmStartTimeOffset: calcDateTimeOffset(settings.sundayPmStartTime, settings.sundayAmStartTime),
        sundayPmEndTimeOffset: calcDateTimeOffset(settings.sundayPmEndTime, settings.sundayPmStartTime),
    }
}

export const convertUTCSettingToLocalSetting = (utcSetting: WorkDaySetting) => {
    const localSettings = convertUTCStartDateOffsetToLocalStartDateOffset(utcSetting)
    return convertUTCDateTimeOffsetToLocalDateTime(localSettings)
}

// about get schedule settings
export const getScheduleSettings = (npi: number, success: (settings: WorkDaySetting) => void, fail: () => void) => {
    const param = {Npi: npi}
    sendRequest(ApiSchedule.GetScheduleSettings, param, (data) => {
        if (!data) {
            return
        }
        const settings = convertUTCSettingToLocalSetting(data)
        success && success(settings)
    }, () => {
        fail && fail()
    })
}

export const convertUTCDateOffsetToLocalDateOffset = (utcOffset: number) => {
    const utcDateTimeString = convertMinutesToDateTimeString(utcOffset)
    const {hour, min} = convertHHmmStringToHHmm(utcDateTimeString)
    const d = new Date(Date.UTC(2000, 0, 0, hour, min))
    const localHour = d.getHours()
    const localMin = d.getMinutes()
    return (localHour * 60 + localMin)
}

export const convertUTCStartDateOffsetToLocalStartDateOffset = (settings: WorkDaySetting) => {
    return {
        ...settings,
        mondayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.mondayAmStartTimeOffset),
        tuesdayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.tuesdayAmStartTimeOffset),
        wednesdayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.wednesdayAmStartTimeOffset),
        thursdayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.thursdayAmStartTimeOffset),
        fridayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.fridayAmStartTimeOffset),
        saturdayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.saturdayAmStartTimeOffset),
        sundayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.sundayAmStartTimeOffset),
    }
}

export const convertUTCDateTimeOffsetToLocalDateTime = (settings: WorkDaySetting) => {
    const minutesToDateTime = (minutes: number) => {
        let hour = parseInt((minutes / 60) + "")
        hour = hour > 12 ? hour - 12 : hour
        const min = parseInt((minutes % 60) + "")
        return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min)
    }
    return {
        ...settings,
        mondayAmStartTime: minutesToDateTime(settings.mondayAmStartTimeOffset),
        mondayAmEndTime: minutesToDateTime(settings.mondayAmStartTimeOffset + settings.mondayAmEndTimeOffset),
        mondayPmStartTime: minutesToDateTime(settings.mondayPmStartTimeOffset + settings.mondayAmStartTimeOffset),
        mondayPmEndTime: minutesToDateTime(settings.mondayAmStartTimeOffset + settings.mondayPmStartTimeOffset + settings.mondayPmEndTimeOffset),

        tuesdayAmStartTime: minutesToDateTime(settings.tuesdayAmStartTimeOffset),
        tuesdayAmEndTime: minutesToDateTime(settings.tuesdayAmStartTimeOffset + settings.tuesdayAmEndTimeOffset),
        tuesdayPmStartTime: minutesToDateTime(settings.tuesdayPmStartTimeOffset + settings.tuesdayAmStartTimeOffset),
        tuesdayPmEndTime: minutesToDateTime(settings.tuesdayAmStartTimeOffset + settings.tuesdayPmStartTimeOffset + settings.tuesdayPmEndTimeOffset),

        wednesdayAmStartTime: minutesToDateTime(settings.wednesdayAmStartTimeOffset),
        wednesdayAmEndTime: minutesToDateTime(settings.wednesdayAmStartTimeOffset + settings.wednesdayAmEndTimeOffset),
        wednesdayPmStartTime: minutesToDateTime(settings.wednesdayPmStartTimeOffset + settings.wednesdayAmStartTimeOffset),
        wednesdayPmEndTime: minutesToDateTime(settings.wednesdayAmStartTimeOffset + settings.wednesdayPmStartTimeOffset + settings.wednesdayPmEndTimeOffset),

        thursdayAmStartTime: minutesToDateTime(settings.thursdayAmStartTimeOffset),
        thursdayAmEndTime: minutesToDateTime(settings.thursdayAmStartTimeOffset + settings.thursdayAmEndTimeOffset),
        thursdayPmStartTime: minutesToDateTime(settings.thursdayPmStartTimeOffset + settings.thursdayAmStartTimeOffset),
        thursdayPmEndTime: minutesToDateTime(settings.thursdayAmStartTimeOffset + settings.thursdayPmStartTimeOffset + settings.thursdayPmEndTimeOffset),

        fridayAmStartTime: minutesToDateTime(settings.fridayAmStartTimeOffset),
        fridayAmEndTime: minutesToDateTime(settings.fridayAmStartTimeOffset + settings.fridayAmEndTimeOffset),
        fridayPmStartTime: minutesToDateTime(settings.fridayPmStartTimeOffset + settings.fridayAmStartTimeOffset),
        fridayPmEndTime: minutesToDateTime(settings.fridayAmStartTimeOffset + settings.fridayPmStartTimeOffset + settings.fridayPmEndTimeOffset),

        saturdayAmStartTime: minutesToDateTime(settings.saturdayAmStartTimeOffset),
        saturdayAmEndTime: minutesToDateTime(settings.saturdayAmStartTimeOffset + settings.saturdayAmEndTimeOffset),
        saturdayPmStartTime: minutesToDateTime(settings.saturdayPmStartTimeOffset + settings.saturdayAmStartTimeOffset),
        saturdayPmEndTime: minutesToDateTime(settings.saturdayAmStartTimeOffset + settings.saturdayPmStartTimeOffset + settings.saturdayPmEndTimeOffset),

        sundayAmStartTime: minutesToDateTime(settings.sundayAmStartTimeOffset),
        sundayAmEndTime: minutesToDateTime(settings.sundayAmStartTimeOffset + settings.sundayAmEndTimeOffset),
        sundayPmStartTime: minutesToDateTime(settings.sundayPmStartTimeOffset + settings.sundayAmStartTimeOffset),
        sundayPmEndTime: minutesToDateTime(settings.sundayAmStartTimeOffset + settings.sundayPmStartTimeOffset + settings.sundayPmEndTimeOffset),
    }
}

export const DefaultUTCSettings = {
    "npi": 0,
    "durationPerSlot": 15,
    "numberPerSlot": 1,

    "mondayAmIsEnable": true,
    "mondayAmStartTime": "00:00",
    "mondayAmStartTimeOffset": 0,
    "mondayAmEndTime": "04:00",
    "mondayAmEndTimeOffset": 240,
    "mondayAmAppointmentType": 1,
    "mondayPmIsEnable": true,
    "mondayPmStartTime": "05:00",
    "mondayPmStartTimeOffset": 300,
    "mondayPmEndTime": "09:00",
    "mondayPmEndTimeOffset": 240,
    "mondayPmAppointmentType": 1,

    "tuesdayAmIsEnable": true,
    "tuesdayAmStartTime": "00:00",
    "tuesdayAmStartTimeOffset": 0,
    "tuesdayAmEndTime": "04:00",
    "tuesdayAmEndTimeOffset": 240,
    "tuesdayAmAppointmentType": 1,
    "tuesdayPmIsEnable": true,
    "tuesdayPmStartTime": "05:00",
    "tuesdayPmStartTimeOffset": 300,
    "tuesdayPmEndTime": "09:00",
    "tuesdayPmEndTimeOffset": 240,
    "tuesdayPmAppointmentType": 1,

    "wednesdayAmIsEnable": true,
    "wednesdayAmStartTime": "00:00",
    "wednesdayAmStartTimeOffset": 0,
    "wednesdayAmEndTime": "04:00",
    "wednesdayAmEndTimeOffset": 240,
    "wednesdayAmAppointmentType": 1,
    "wednesdayPmIsEnable": true,
    "wednesdayPmStartTime": "05:00",
    "wednesdayPmStartTimeOffset": 300,
    "wednesdayPmEndTime": "09:00",
    "wednesdayPmEndTimeOffset": 240,
    "wednesdayPmAppointmentType": 1,

    "thursdayAmIsEnable": true,
    "thursdayAmStartTime": "00:00",
    "thursdayAmStartTimeOffset": 0,
    "thursdayAmEndTime": "04:00",
    "thursdayAmEndTimeOffset": 240,
    "thursdayAmAppointmentType": 1,
    "thursdayPmIsEnable": true,
    "thursdayPmStartTime": "05:00",
    "thursdayPmStartTimeOffset": 300,
    "thursdayPmEndTime": "09:00",
    "thursdayPmEndTimeOffset": 240,
    "thursdayPmAppointmentType": 1,

    "fridayAmIsEnable": true,
    "fridayAmStartTime": "00:00",
    "fridayAmStartTimeOffset": 0,
    "fridayAmEndTime": "04:00",
    "fridayAmEndTimeOffset": 240,
    "fridayAmAppointmentType": 1,
    "fridayPmIsEnable": true,
    "fridayPmStartTime": "05:00",
    "fridayPmStartTimeOffset": 300,
    "fridayPmEndTime": "09:00",
    "fridayPmEndTimeOffset": 240,
    "fridayPmAppointmentType": 1,

    "saturdayAmIsEnable": true,
    "saturdayAmStartTime": "00:00",
    "saturdayAmStartTimeOffset": 0,
    "saturdayAmEndTime": "04:00",
    "saturdayAmEndTimeOffset": 240,
    "saturdayAmAppointmentType": 1,
    "saturdayPmIsEnable": true,
    "saturdayPmStartTime": "05:00",
    "saturdayPmStartTimeOffset": 300,
    "saturdayPmEndTime": "09:00",
    "saturdayPmEndTimeOffset": 240,
    "saturdayPmAppointmentType": 1,

    "sundayAmIsEnable": true,
    "sundayAmStartTime": "00:00",
    "sundayAmStartTimeOffset": 0,
    "sundayAmEndTime": "04:00",
    "sundayAmEndTimeOffset": 240,
    "sundayAmAppointmentType": 1,
    "sundayPmIsEnable": true,
    "sundayPmStartTime": "05:00",
    "sundayPmStartTimeOffset": 300,
    "sundayPmEndTime": "09:00",
    "sundayPmEndTimeOffset": 240,
    "sundayPmAppointmentType": 1,
}