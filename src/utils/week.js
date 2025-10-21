export function getWeekType() {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Ustaw na pierwszy poniedziałek roku
  const weekDiff = Math.floor((today - startDate) / (7 * 24 * 60 * 60 * 1000));
  const currentWeek = (weekDiff % 2 === 0) ? "P" : "N";
  return currentWeek;
}