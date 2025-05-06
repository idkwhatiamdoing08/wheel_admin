import React from 'react'
import { Calendar, theme } from 'antd';

function WheelCalendar({ onDateSelect }) {
  const onPanelChanged = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    if (onDateSelect) {
      onDateSelect(value);  // Вызываем callback с выбранной датой
    }
  };
  
    const { token } = theme.useToken();
    const wrapperStyle = {
      width: 300,
      border: `1px solid ${token.colorBorderSecondary}`,
      borderRadius: token.borderRadiusLG,
    };
  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChanged} />
    </div>
  )
}

export default WheelCalendar