import dayjs from "dayjs";

export const getPlainTime = (time?: number | string): string => {
  const now = dayjs();
  const dayjsTime = dayjs(time);
  const diffMonth = dayjsTime.diff(now, "month");
  const diffYear = dayjsTime.diff(now, "year");
  const diffDay = dayjsTime.diff(now, "days");
  if (diffYear < 0) {
    return `${-diffYear}年前`;
  }
  if (diffMonth < 0) {
    return `${-diffMonth}月前`;
  }
  switch (diffDay) {
    case -1:
      return "昨天";
    case -2:
      return "前天";
    default:
      return `${-diffDay}天前`;
  }
};
