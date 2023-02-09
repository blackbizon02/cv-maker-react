import './App.css';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import PersonalInfo from './pages/ResumePage';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<WelcomePage />} />
      <Route path={'/personal-info'} element={<PersonalInfo />} />
    </Routes>
  );
}

export default App;
