import dayjs from "dayjs";

export function getWeekRange(date: string | Date) {
    const start = dayjs(date).startOf("week").format("YYYY-MM-DD");
    const end = dayjs(date).endOf("week").format("YYYY-MM-DD");
    return { start, end };
}
