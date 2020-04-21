export const getFullDate = (date) => {
  let log = '';
  log = date.getDate() < 10 ? log + `0${date.getDate()}` : log + `${date.getDate()}`;
  log = date.getMonth() < 10 ? log + `.0${date.getMonth() + 1}` : log + `.${date.getMonth() + 1}`;
  log = log + `.${date.getFullYear() % 100}`;
  return log;
}