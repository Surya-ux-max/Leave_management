import { useState, useEffect } from 'react';

const LeaveContributionCalendar = ({ applications = [] }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    generateCalendarData();
  }, [applications]);

  const generateCalendarData = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);
    
    const data = [];
    const leaveMap = {};

    // Create a map of leave applications by date
    applications.forEach(app => {
      const fromDate = new Date(app.from_date);
      const toDate = new Date(app.to_date);
      
      // Only include dates from current year
      for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
        if (d.getFullYear() === currentYear) {
          const dateStr = d.toISOString().split('T')[0];
          if (!leaveMap[dateStr]) {
            leaveMap[dateStr] = [];
          }
          leaveMap[dateStr].push(app);
        }
      }
    });

    // Generate calendar data for the current year only
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const leaves = leaveMap[dateStr] || [];
      
      data.push({
        date: new Date(d),
        dateStr,
        count: leaves.length,
        leaves: leaves,
        level: Math.min(leaves.length, 4)
      });
    }

    setCalendarData(data);
  };

  const getColorForLevel = (level) => {
    const colors = {
      0: '#ebedf0',
      1: '#9be9a8',
      2: '#40c463',
      3: '#30a14e',
      4: '#216e39'
    };
    return colors[level] || colors[0];
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWeeksInYear = () => {
    const weeks = [];
    let currentWeek = [];
    
    // Start from first Sunday of the year or before
    const firstDay = calendarData[0]?.date;
    if (!firstDay) return [];
    
    const startOfWeek = new Date(firstDay);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    // Create weeks array
    const endOfYear = calendarData[calendarData.length - 1]?.date;
    if (!endOfYear) return [];
    
    for (let d = new Date(startOfWeek); d <= endOfYear; d.setDate(d.getDate() + 7)) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(d);
        currentDate.setDate(currentDate.getDate() + i);
        const dayData = calendarData.find(day => 
          day.date.toDateString() === currentDate.toDateString()
        );
        week.push(dayData || null);
      }
      weeks.push(week);
    }
    
    return weeks;
  };

  const weeks = getWeeksInYear();
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const hasData = applications.length > 0;

  const handleCellHover = (day, event) => {
    if (day) {
      setHoveredDate(day.dateStr);
      const rect = event.target.getBoundingClientRect();
      setHoveredPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
  };

  const handleCellLeave = () => {
    setHoveredDate(null);
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 0.5rem 0'
        }}>
          Leave Application Activity - {new Date().getFullYear()}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          margin: 0
        }}>
          {hasData ? 'Your leave application pattern throughout the year' : 'No leave applications yet this year'}
        </p>
      </div>

      {/* Calendar Grid */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        {/* Month labels */}
        <div style={{ 
          position: 'relative',
          height: '16px',
          marginBottom: '4px'
        }}>
          {monthLabels.map((month, monthIndex) => {
            // Calculate approximate position for each month
            const monthStartWeek = Math.floor(monthIndex * 4.33); // Approximate weeks per month
            return (
              <div key={month} style={{ 
                position: 'absolute',
                left: `${30 + (monthStartWeek * 15)}px`, // 30px offset + week width
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#6b7280'
              }}>
                {month}
              </div>
            );
          })}
        </div>

        {/* Calendar with day labels */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Day labels - show all 7 days */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '2px',
            marginRight: '6px',
            fontSize: '0.75rem',
            color: '#6b7280',
            width: '24px'
          }}>
            {dayLabels.map((day, index) => (
              <div key={day} style={{ 
                height: '11px',
                lineHeight: '11px',
                textAlign: 'right',
                fontWeight: '500'
              }}>
                {index % 2 === 1 ? day.slice(0, 3) : ''}
              </div>
            ))}
          </div>

          {/* Calendar weeks */}
          <div style={{ 
            display: 'flex', 
            gap: '2px',
            flexWrap: 'nowrap'
          }}>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '2px'
              }}>
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    style={{
                      width: '11px',
                      height: '11px',
                      backgroundColor: day ? getColorForLevel(day.level) : '#ebedf0',
                      borderRadius: '2px',
                      cursor: day ? 'pointer' : 'default',
                      opacity: day ? 1 : 0.3,
                      transition: 'all 0.1s ease'
                    }}
                    onMouseEnter={(e) => day && handleCellHover(day, e)}
                    onMouseLeave={handleCellLeave}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend - properly aligned */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: '0.75rem',
        color: '#6b7280'
      }}>
        <span>Less</span>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              style={{
                width: '11px',
                height: '11px',
                backgroundColor: getColorForLevel(level),
                borderRadius: '2px'
              }}
            />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Tooltip */}
      {hoveredDate && (
        <div style={{
          position: 'fixed',
          left: hoveredPosition.x,
          top: hoveredPosition.y,
          transform: 'translateX(-50%) translateY(-100%)',
          backgroundColor: '#1f2937',
          color: '#ffffff',
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          fontSize: '0.75rem',
          zIndex: 1000,
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          maxWidth: '200px'
        }}>
          {(() => {
            const day = calendarData.find(d => d.dateStr === hoveredDate);
            if (!day) return null;
            
            return (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  {formatDate(day.date)}
                </div>
                <div>
                  {day.count === 0 ? 'No leave applications' : 
                   `${day.count} leave application${day.count !== 1 ? 's' : ''}`}
                </div>
                {day.leaves.length > 0 && (
                  <div style={{ marginTop: '0.25rem', fontSize: '0.7rem', opacity: 0.8 }}>
                    {day.leaves.map((leave, index) => (
                      <div key={index}>
                        • {leave.leave_type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default LeaveContributionCalendar;