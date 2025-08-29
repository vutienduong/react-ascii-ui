import React from "react";

interface AsciiCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentDate?: Date;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  showNavigation?: boolean;
  onMonthChange?: (date: Date) => void;
}

export const AsciiCalendar: React.FC<AsciiCalendarProps> = ({
  currentDate = new Date(),
  selectedDate,
  onDateSelect,
  showNavigation = true,
  onMonthChange,
  className = "",
  ...props
}) => {
  const [viewDate, setViewDate] = React.useState(currentDate);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Convert Sunday (0) to be at the end (6), Monday becomes 0
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (onDateSelect) {
      onDateSelect(clickedDate);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setViewDate(newDate);
    if (onMonthChange) {
      onMonthChange(newDate);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="w-8 h-6 flex items-center justify-center text-gray-500">
          --
        </div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const isSelectedDay = selectedDate && isSameDay(dayDate, selectedDate);
      const isTodayDay = isToday(dayDate);
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
            w-8 h-6 flex items-center justify-center text-sm
            hover:bg-white hover:text-black cursor-pointer
            ${isSelectedDay ? 'bg-green-400 text-black font-bold' : 'text-white'}
            ${isTodayDay && !isSelectedDay ? 'text-yellow-400 font-bold' : ''}
          `}
        >
          {String(day).padStart(2, '0')}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div
      {...props}
      className={`font-mono bg-black text-white border border-white p-3 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-white">
        {showNavigation && (
          <button
            onClick={() => navigateMonth('prev')}
            className="hover:text-green-400 cursor-pointer"
          >
            [&lt;]
          </button>
        )}
        
        <div className="font-bold text-center flex-1">
          {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
        </div>
        
        {showNavigation && (
          <button
            onClick={() => navigateMonth('next')}
            className="hover:text-green-400 cursor-pointer"
          >
            [&gt;]
          </button>
        )}
      </div>

      {/* Day names header */}
      <div className="grid grid-cols-7 gap-0 mb-1 border-b border-white pb-1">
        {dayNames.map((dayName) => (
          <div key={dayName} className="w-8 h-6 flex items-center justify-center text-xs font-bold">
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0">
        {renderCalendar()}
      </div>
      
      {/* Legend */}
      <div className="mt-2 pt-2 border-t border-white text-xs">
        <div className="flex flex-wrap gap-4">
          <span>
            <span className="text-yellow-400 font-bold">●</span> Today
          </span>
          {selectedDate && (
            <span>
              <span className="bg-green-400 text-black px-1">●</span> Selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
};