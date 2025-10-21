import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faClock } from '@fortawesome/free-solid-svg-icons'
import ScheduleRows from './components/scheduleRows.jsx';
import LessonDetails from './components/LessonDetails.jsx'; // Nowy komponent
import { getWeekType } from "./utils/week";
import './App.css'

function App() {
  const [group, setGroup] = useState(Cookies.get('group') || '11K1');
  const [lab, setLab] = useState((Cookies.get('lab')) || '1');
  const [klab, setkLab] = useState((Cookies.get('klab')) || '1');
  const [week, setWeek] = useState(Cookies.get('week') || 'A');
  const [selectedLesson, setSelectedLesson] = useState(null); // Nowy stan dla wybranej lekcji
  const weekType = week === "A" ? getWeekType() : week;
  console.log(getWeekType());
  const [hours, setHours] = useState([])
  const [dataP, setDataP] = useState([])
  const [dataN, setDataN] = useState([])
  const [days, setDays] = useState([])
  const [excluded, setExcluded] = useState([])

  useEffect(() => {
    Cookies.set('group', group);
  }, [group]);

  useEffect(() => {
    Cookies.set('lab', lab);
  }, [lab]);

  useEffect(() => {
    Cookies.set('klab', klab);
  }, [klab]);

  useEffect(() => {
    Cookies.set('week', week);
  }, [week]);

  useEffect(() => {
    fetch('http://localhost:8000/api/hours')
      .then(res => res.json())
      .then(data => setHours(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/timetable/P')
      .then(res => res.json())
      .then(data => setDataP(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/timetable/N')
      .then(res => res.json())
      .then(data => setDataN(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/days')
      .then(res => res.json())
      .then(data => setDays(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/excluded')
      .then(res => res.json())
      .then(data => setExcluded(data));
  }, []);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseDetails = () => {
    setSelectedLesson(null);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top text-white d-flex justify-content-between align-items-center">
        <h2 className="mb-0 text-uppercase ms-3 ms-md-5">Plan zajęć</h2>
        <div className="ms-auto me-md-5 d-flex align-items-center gap-3">
          <div className='fs-5 fw-medium'>{group} - {week}</div>
          <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#settings" >
            <FontAwesomeIcon icon={faSliders} size="2x" className="text-white" />
          </button>
        </div>
      </nav>
      <h2 className="mb-0 text-uppercase ms-3 ms-md-5 text-white">Plan zajęć</h2>
      <div className='container-fluid mt-5'>
        <div className="container-fluid p-0">
          <table className="table schedule">
            <thead>
              <tr>
                <th className='timeCollumn'><span className="d-none d-sm-inline">Godzina</span></th>
                <th><span className='d-none d-sm-inline'>Poniedziałek</span><span className="d-inline d-sm-none ">Pon</span></th>
                <th><span className='d-none d-sm-inline'>Wtorek</span><span className="d-inline d-sm-none ">Wt</span></th>
                <th><span className='d-none d-sm-inline'>Środa</span><span className="d-inline d-sm-none ">Śr</span></th>
                <th><span className='d-none d-sm-inline'>Czwartek</span><span className="d-inline d-sm-none ">Czw</span></th>
                <th><span className='d-none d-sm-inline'>Piątek</span><span className="d-inline d-sm-none ">Pt</span></th>
              </tr>
            </thead>
            <tbody>
              <ScheduleRows 
                hours={hours} 
                data={[dataN, dataP]} 
                week={weekType} 
                groups={[lab, klab]}
                onLessonClick={handleLessonClick}
                excluded={excluded}
              />
            </tbody>
          </table>
        </div>

        {/* Wysuwane okno z detalami lekcji */}
        <LessonDetails 
          lesson={selectedLesson} 
          onClose={handleCloseDetails} 
        />


      <div className="modal fade" id="settings" tabIndex="-1" role="dialog" aria-labelledby="settingsLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="settingsLabel">Ustawienia</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container text-center">
                <div className="row">
                  <div className="col text-start">
                    <label htmlFor='groupSelect' className='form-label'>Wybierz grupę</label>
                    <select className='form-select' id='groupSelect' value={group} onChange={(e)=>setGroup(e.target.value)}>
                      <option value="11k1">11K1</option>
                      <option value="11k2">11K2</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col text-start">
                    <label htmlFor='weekSelect' className='form-label'>Tydzień</label>
                    <select className='form-select' id='weekSelect' value={week} onChange={(e)=>setWeek(e.target.value)} >
                      <option value="A">Aktualny</option>
                      <option value="N">Nieparzysty</option>
                      <option value="P">Parzysty</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col text-start">
                    <label htmlFor='labSelect' className='form-label'>Labolatoria</label>
                    <select className='form-select' id='labSelect' value={lab} onChange={(e)=>setLab(e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="col text-start">
                    <label htmlFor='labKSelect' className='form-label'>Lab. Komputerowe</label>
                    <select className='form-select' id='labKSelect' value={klab} onChange={(e)=>setkLab(e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
