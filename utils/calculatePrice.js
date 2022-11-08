import dayjs from "dayjs";

export default function({
    pricePerHour = 1,
    startDate ,
    endDate
}){
    
    startDate = dayjs(startDate)
    endDate = dayjs(endDate)

    const hour = 3600;
    const totalHours = (endDate.unix() - startDate.unix()) / hour;
    return Math.round(pricePerHour * totalHours)
}