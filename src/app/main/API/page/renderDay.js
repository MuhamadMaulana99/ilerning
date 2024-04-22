const { Typography } = require('@mui/material');

const renderDay = (day, _value, dayInCurrentMonth, _dayComponent) => {
  if (!dayInCurrentMonth) {
    return <div />;
  }

  const dayString = day.toLocaleString('default', { weekday: 'long' });
  const isWeekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(dayString);

  if (isWeekday) {
    return <Typography variant="body2">{dayString}</Typography>;
  }

  return <div />;
};
export default renderDay;
