import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faClock, faUser, faMapMarkerAlt, faBook } from '@fortawesome/free-solid-svg-icons';

function LessonDetails({ lesson, onClose }) {
  if (!lesson) return null;

  const getDayName = (dayNumber) => {
    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
    return days[dayNumber - 1] || '';
  };

  return (
    <div className={`lesson-details-overlay ${lesson ? 'active' : ''}`} onClick={onClose}>
      <div className="lesson-details-container" onClick={(e) => e.stopPropagation()}>
        <div className="lesson-details-header">
          <h3 className="lesson-details-title">{lesson.syllabus}</h3>
          <button className="lesson-details-close" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        
        <div className="lesson-details-content">
          <div className="lesson-details-section">
            <div className="detail-item">
              <FontAwesomeIcon icon={faBook} className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Typ zajęć</span>
                <span className="detail-value">{lesson.lessonType}</span>
              </div>
            </div>

            <div className="detail-item">
              <FontAwesomeIcon icon={faClock} className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Termin</span>
                <span className="detail-value">
                  {getDayName(lesson.day)} • Godzina {lesson.hour}
                </span>
              </div>
            </div>

            {lesson.lecturer && (
              <div className="detail-item">
                <FontAwesomeIcon icon={faUser} className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Prowadzący</span>
                  <span className="detail-value">
                    {lesson.lecturerLink ? (
                      <a href={lesson.lecturerLink} target="_blank" rel="noopener noreferrer">
                        {lesson.lecturer}
                      </a>
                    ) : (
                      lesson.lecturer
                    )}
                  </span>
                </div>
              </div>
            )}

            {lesson.hall && (
              <div className="detail-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Sala</span>
                  <span className="detail-value">
                    {lesson.hallLink ? (
                      <a href={lesson.hallLink} target="_blank" rel="noopener noreferrer">
                        {lesson.hall}
                      </a>
                    ) : (
                      lesson.hall
                    )}
                  </span>
                </div>
              </div>
            )}

            {lesson.group && (
              <div className="detail-item">
                <div className="detail-content">
                  <span className="detail-label">Grupa</span>
                  <span className="detail-value">{lesson.group}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lesson-details-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: none;
          justify-content: center;
          align-items: flex-end;
          z-index: 1050;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .lesson-details-overlay.active {
          display: flex;
          opacity: 1;
        }

        .lesson-details-container {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 800px;
          max-height: 80vh;
          transform: translateY(100%);
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        .lesson-details-overlay.active .lesson-details-container {
          transform: translateY(0);
        }

        .lesson-details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .lesson-details-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #212529;
        }

        .lesson-details-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #6c757d;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lesson-details-close:hover {
          background-color: #e9ecef;
          color: #495057;
        }

        .lesson-details-content {
          padding: 1.5rem;
          max-height: calc(80vh - 80px);
          overflow-y: auto;
        }

        .lesson-details-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .detail-icon {
          color: #6c757d;
          width: 1.25rem;
          margin-top: 0.125rem;
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .detail-label {
          font-size: 0.875rem;
          color: #6c757d;
          margin-bottom: 0.25rem;
        }

        .detail-value {
          font-size: 1rem;
          color: #212529;
          font-weight: 500;
        }

        .detail-value a {
          color: #0d6efd;
          text-decoration: none;
        }

        .detail-value a:hover {
          text-decoration: underline;
        }

        @media (min-width: 768px) {
          .lesson-details-container {
            border-radius: 12px;
            margin: 2rem;
            width: 90%;
            max-height: 70vh;
          }

          .lesson-details-overlay {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default LessonDetails;