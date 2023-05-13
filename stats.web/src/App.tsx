import TopNavbar from './components/TopNavBar/TopNavBar';
import MainContainer from './components/MainContainer';
import { Routes, Route } from 'react-router-dom';
import TeamScheduleContainer from './components/Teams/TeamSchedule';
import TeamSeasonContainer from './components/Teams/TeamSeason';
import OpponentsContainer from './components/Opponents';
import TeamInfo from './components/Teams/TeamInfo';

import './App.scss';

function App() {
    return (
        <>
            <TopNavbar></TopNavbar>
            <Routes>
                <Route path="/" element={<MainContainer />}></Route>
                <Route path="/teams/:id/schedule" element={<TeamScheduleContainer />}></Route>
                <Route path="/teams/:id/teamInfo" element={<TeamInfo />}></Route>
                <Route path="/teams/:id/season-stats" element={<TeamSeasonContainer />}></Route>
                <Route path="/teams/opponents" element={<OpponentsContainer />}></Route>
                <Route></Route>
            </Routes>

        </>
    );
}

export default App;
