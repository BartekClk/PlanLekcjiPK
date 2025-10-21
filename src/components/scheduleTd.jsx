import React, { useState, useEffect } from "react";

function ScheduleTd({ lesson, onLessonClick }) { // Dodajemy prop onLessonClick

  const handleClick = () => {
    if (lesson.id !== "none" && onLessonClick) {
      onLessonClick(lesson);
    }
  };

  if (lesson.id === "none") {
    return (
      <td className="text-start"></td>
    );
  } else {
    return (
      <td 
        className={`text-start align-top p-1 py-2 pe-0 p-sm-2 ${lesson.borderColor.includes('clickable') ? 'clickable' : ''}`} 
        onClick={handleClick}
        style={{ cursor: 'pointer' }} // Dodajemy kursor wskaźnika
      >
        <div className={`container text-left d-flex flex-column justify-content-between bg-opacity-10 p-1 p-sm-2 rounded ${lesson.color || "bg-primary"} && ${lesson.borderColor || "border-primary"} border-start border-2`} 
             style={{ height: "100%" }}>
          
          {/* góra komórki */}
          <div className="row pt-2 pb-2 pt-sm-0">
            <div className="col">
              <div className={`fw-medium lessonTitle ${lesson.textColor}`}>{lesson.syllabus || ""}</div>
            </div>
          </div>
          
          {/* dół komórki */}
          <div>
            <div className="row d-none d-sm-flex">
              <div className="col">
                {lesson.lecturer !== "" ? (
                  <div className="row">
                    <div className="col">
                      <a target="_blank" href={lesson.lecturerLink || "#"}>
                        {lesson.lecturer}
                      </a>
                    </div>
                  </div>
                ) : ""}
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-between lessonType noWrap">
                <span className="d-none d-sm-inline">
                  {lesson.hall !== "" ? (
                    <a target="_blank" href={lesson.hallLink || "#"}>
                      {lesson.hall || "Sala"}
                    </a>
                  ) : ""}
                </span>
                <span className="type">{lesson.lessonType}</span>
                <span className="typeShort">{lesson.lessonTypeShort}</span>
              </div>
            </div>
          </div>
        </div>
      </td>
    );
  }
}

export default ScheduleTd;