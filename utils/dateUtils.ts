import dayjs from 'dayjs'

export function getWeekRange(date: string | Date) {
    const start = dayjs(date).startOf('week').format('YYYY-MM-DD')
    const end = dayjs(date).endOf('week').format('YYYY-MM-DD')
    return { start, end }
}

export function toUTCISOString(date: string | Date) {
    return new Date(date).toISOString()
}

export function formatLocalDateTime(date: string | Date, format: string) {
    return dayjs(date).local().format(format)
}

export function formatLocalInputValue(date: string | Date) {
    return dayjs(date).local().format('YYYY-MM-DDTHH:mm')
}
