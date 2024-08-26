export function formatTimeStr(t: string | number, hideHMS?: boolean) {
  if (!t) {
    return;
  }
  t = t.toString();
  const year = t.slice(0, 4);
  const month = t.slice(4, 6);
  const day = t.slice(6, 8);
  const h = t.slice(8, 10);
  const m = t.slice(10, 12);
  return hideHMS ? `${year}/${month}/${day}日` : `${year}/${month}/${day} ${h}:${m}`;
}

export function getTimeStr(dataParam?: any, deleteHMS?: boolean) {
  const date = dataParam || new Date();
  const year = date.getFullYear();
  const originMonth = date.getMonth() + 1;
  const month = originMonth < 10 ? `0${originMonth}` : originMonth;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return deleteHMS ? `${year}${month}${day}000000` : `${year}${month}${day}${h}${m}${s}`;
}

// format todo
export function getCurDate() {
  const date = new Date();
  const year = date.getFullYear();
  const originMonth = date.getMonth() + 1;
  const month = originMonth < 10 ? `0${originMonth}` : originMonth;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
}

export function getCurTime() {
  const date = new Date();
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${h}:${m}:${s}`;
}

export function getReverseDate(date: any) {
  return new Date(
    date.slice(0, 4),
    date.slice(4, 6) - 1,
    date.slice(6, 8),
    date.slice(8, 10),
    date.slice(10, 12),
    date.slice(12, 14)
  );
}

export function getDaysInMonth(date: any) {
  // date 格式是 YYYYMM
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const daysInMonth = new Date(year, month, 0).getDate();
  return daysInMonth;
}
