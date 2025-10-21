import React, { useState, useEffect, useMemo } from "react";
import ScheduleTd from "./scheduleTd.jsx";

function ScheduleRows({ hours, data, week, groups, onLessonClick }) {
  const [timetable, setTimetable] = useState([]);

  // Normalizacja i filtracja danych
  const processedTimetable = useMemo(() => {
    if (!timetable.length) return [];
    
    return timetable.map(lesson => {
      const type = lesson.lessonType?.trim() || "";
      const normalizedLesson = { ...lesson };
      
      // Mapowanie typów zajęć i kolorów
      const typeConfig = {
        'W': { name: 'Wykład', color: 'bg-primary', textColor: 'text-primary', lessonTypeShort: 'W', borderColor: 'border-primary clickable' },
        'Ć': { name: 'Ćwiczenia', color: 'bg-warning', textColor: 'text-warning-dark', lessonTypeShort: 'Ć', borderColor: 'border-warning clickable' }
      };
      
      if (typeConfig[type]) {
        normalizedLesson.lessonType = typeConfig[type].name;
        normalizedLesson.color = typeConfig[type].color;
        normalizedLesson.textColor = typeConfig[type].textColor;
        normalizedLesson.lessonTypeShort = typeConfig[type].lessonTypeShort;
        normalizedLesson.borderColor = typeConfig[type].borderColor;
      } 
      else if (type.startsWith('K') && type.length <= 3) {
        const group = type.slice(2);
        normalizedLesson.group = group;
        normalizedLesson.lessonType = `Lab. Komputerowe${group ? ` ${group}` : ''}`;
        normalizedLesson.lessonTypeShort = `LK${group ? `${group}` : ''}`;
        normalizedLesson.color = 'bg-success';
        normalizedLesson.textColor = 'text-success'
        normalizedLesson.borderColor = 'border-success clickable'
        normalizedLesson.shouldFilter = group !== String(groups[1]);
      } 
      else if (type.startsWith('L') && type.length <= 3) {
        const group = type.slice(2);
        normalizedLesson.group = group;
        normalizedLesson.lessonType = `Laboratoria${group ? ` ${group}` : ''}`;
        normalizedLesson.lessonTypeShort = `L${group ? `${group}` : ''}`;
        normalizedLesson.color = 'bg-danger';
        normalizedLesson.textColor = 'text-danger'
        normalizedLesson.borderColor = 'border-danger clickable'
        normalizedLesson.shouldFilter = group !== String(groups[0]);
      }
      
      if (lesson.syllabus === "Język Angielski") {
        normalizedLesson.color = "bg-info";
        normalizedLesson.textColor = 'text-info-dark'
        normalizedLesson.borderColor = 'border-info clickable'
      }
      
      return normalizedLesson;
    });
  }, [timetable, groups]);

  useEffect(() => {
    const weekData = week === "N" ? data[0] : week === "P" ? data[1] : [];
    const sortedData = [...weekData].sort((a, b) => a.hour - b.hour);
    setTimetable(sortedData);
  }, [week, data]);

 const scheduleRows = useMemo(() => {
    return hours.map((hour) => {
      const hourLessons = processedTimetable.filter(item => item.hour === hour.id);
      const dayLessons = [];
      for (let day = 1; day <= 5; day++) {
        const lesson = hourLessons.find(l => l.day === day);
        if (!lesson) {
          dayLessons.push({ id: "none", day });
          continue;
        }
        if (lesson.shouldFilter) {
          dayLessons.push({ id: "none", day });
        } else {
          dayLessons.push(lesson);
        }
      }
      return (
        <tr key={hour.id}>
          <td className="text-center">
            <div>
              {hour.start} <br />
              {hour.end}
            </div>
          </td>
          {dayLessons.map((lesson, index) => (
            <ScheduleTd 
              key={`${lesson.day}-${index}`} 
              lesson={lesson} 
              onLessonClick={onLessonClick} // Przekazujemy funkcję dalej
            />
          ))}
        </tr>
      );
    });
  }, [hours, processedTimetable, onLessonClick]); // Dodajemy onLessonClick do zależności

  return scheduleRows;
}

export default ScheduleRows;