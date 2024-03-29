import React, {useMemo, useState} from "react";
import moment from "moment";
import {TimeFormat} from "../../../../utils/enum/enum";
import WorkDayItem from "./workDayItem";
import Button from "../../../../components/buttons/button";

interface IProps {
    selectedDate: string,
    pointOutDate?: Set<string>,
    onChangeDate: (date: string) => void
}

export default function WorkDaysList(props: IProps) {
    const {selectedDate, pointOutDate, onChangeDate} = props
    const [activeDate, setActiveDate] = useState<string>(moment().format(TimeFormat.YYYYMMDD))
    const onClickPreviousMonth = () => {
        const newDate = moment(activeDate, TimeFormat.YYYYMMDD).subtract(21, "days")
            .format(TimeFormat.YYYYMMDD)
        setActiveDate(newDate)
    }

    const onClickNextMonth = () => {
        const newDate = moment(activeDate, TimeFormat.YYYYMMDD).add(21, "days")
            .format(TimeFormat.YYYYMMDD)
        setActiveDate(newDate)
    }

    const $navLeft = (
        <Button onClick={onClickPreviousMonth}>
            <i className="fas fa-angle-left"/>
        </Button>
    )

    const $navRight = (
        <Button onClick={onClickNextMonth}>
            <i className="fas fa-angle-right"/>
        </Button>
    )

    const workDays = useMemo(() => {
        let list = []
        for (let i = 0; i < 21; i ++) {
            const md = moment(activeDate, TimeFormat.YYYYMMDD).add(i, "day")
            const date = md.format(TimeFormat.YYYYMMDD)
            list.push({
                isOutOfMonth: md.isBefore(moment(), "day"),
                date: date,
                isSelected: date === selectedDate,
                showPoint: pointOutDate !== undefined && pointOutDate.has(date),
            })
        }
        return list
    }, [activeDate, selectedDate])
    const $list = (
        <div className={'flex-1 flex flex-row items-center justify-between'}>
            {
                workDays.map(({date, isSelected, showPoint, isOutOfMonth}, idx) => {
                    return <WorkDayItem key={idx} date={date} isSelected={isSelected} showPoint={showPoint} isOutOfMonth={isOutOfMonth} onChangeDate={onChangeDate} />
                })
            }
        </div>
    )

    return (
        <div className={"w-full flex flex-row items-center justify-between space-x-4"}>
            {$navLeft}
            {$list}
            {$navRight}
        </div>
    )
}
