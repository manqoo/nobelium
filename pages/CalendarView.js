import React from 'react';

export default function CalendarView() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '1.5rem' }}>🗓️ 这个月</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '10px'
        }}
      >
        {days.map((day) => (
          <div
            key={day}
            style={{
              border: '1px solid #ddd',
              borderRadius: '6px',
              padding: '10px',
              height: '100px',
            }}
          >
            <strong>{day}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
