import React, { useState } from "react";

// Check overlap for the same date
const isOverlap = (newEvent, events) =>
  events.some(
    (evt) =>
      evt.id !== newEvent.id &&
      evt.date === newEvent.date &&
      newEvent.startTime < evt.endTime &&
      newEvent.endTime > evt.startTime
  );

const initialEvents = [
  { id: 1, title: "Meeting", date: "2025-09-21", startTime: 10, endTime: 11 },
  { id: 2, title: "Lunch", date: "2025-09-21", startTime: 12, endTime: 13 },
];

const HOURS = [...Array(24).keys()];

export default function Calendar() {
  const [events, setEvents] = useState(initialEvents);
  const [draggedEventId, setDraggedEventId] = useState(null);

  const onDragStart = (e, eventId) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedEventId(eventId);
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e, dropHour) => {
    e.preventDefault();
    if (!draggedEventId) return;

    setEvents((oldEvents) => {
      const event = oldEvents.find((ev) => ev.id === draggedEventId);
      if (!event) return oldEvents;

      const duration = event.endTime - event.startTime;
      const newStart = dropHour;
      const newEnd = newStart + duration;
      if (newStart < 0 || newEnd > 24) return oldEvents;

      const updatedEvent = { ...event, startTime: newStart, endTime: newEnd };

      if (isOverlap(updatedEvent, oldEvents)) {
        alert("Can't move event: time slot overlaps another event.");
        return oldEvents;
      }
      return oldEvents.map((ev) => (ev.id === draggedEventId ? updatedEvent : ev));
    });

    setDraggedEventId(null);
  };

  return (
    <div style={{ width: 320, margin: "auto" }}>
      <h2>Calendar for 2025-09-21</h2>
      <div
        style={{
          height: 720,
          border: "1px solid #ccc",
          position: "relative",
          userSelect: "none",
        }}
      >
        {HOURS.map((hour) => {
          // Show event block only at its startTime
          const event = events.find((ev) => ev.startTime === hour && ev.date === "2025-09-21");

          return (
            <div
              key={hour}
              onDrop={(e) => onDrop(e, hour)}
              onDragOver={onDragOver}
              style={{
                height: 30,
                borderTop: "1px solid #ddd",
                paddingLeft: 5,
                backgroundColor: hour % 2 ? "#fafafa" : "white",
                position: "relative",
              }}
            >
              <div style={{ fontSize: 12, color: "#888" }}>{hour}:00</div>
              {event && (
                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, event.id)}
                  style={{
                    position: "absolute",
                    left: 60,
                    top: 0,
                    height: (event.endTime - event.startTime) * 30,
                    width: 240,
                    backgroundColor: "#4caf50",
                    color: "white",
                    borderRadius: 4,
                    padding: 5,
                    cursor: "grab",
                    userSelect: "none",
                    boxSizing: "border-box",
                    zIndex: 10,
                  }}
                  title={`${event.title} (${event.startTime}:00 - ${event.endTime}:00)`}
                >
                  {event.title}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
