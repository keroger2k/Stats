import TopNavbar from './components/TopNavBar/TopNavBar';
import MainContainer from './components/MainContainer';
import { Routes, Route } from 'react-router-dom';
import TeamScheduleContainer from './components/Teams/TeamSchedule';
import TeamSeasonContainer from './components/Teams/TeamSeason';
import TeamPitchSmart from './components/Teams/TeamPitchSmart';
import OpponentsContainer from './components/Opponents';
import TeamInfo from './components/Teams/TeamInfo';
import EventPage from './components/Events/Event';

import './App.scss';
import Videos from './components/Events/Videos';

function App() {
    return (
        <>
            <TopNavbar></TopNavbar>
            <main className="MainContent__mainContentContainer">
                <Routes>
                    <Route path="/" element={<MainContainer />}></Route>
                    <Route path="/teams/:id/schedule" element={<TeamScheduleContainer />}></Route>
                    <Route path="/teams/:id/teamInfo" element={<TeamInfo />}></Route>
                    <Route path="/teams/:id/season-stats" element={<TeamSeasonContainer />}></Route>
                    <Route path="/teams/:id/pitch-smart" element={<TeamPitchSmart />}></Route>
                    <Route path="/teams/:id/schedule/:eventID" element={<EventPage />}></Route>
                    <Route path="/teams/:id/schedule/:eventID/videos" element={<Videos />}></Route>
                    <Route path="/teams/opponents" element={<OpponentsContainer />}></Route>
                    <Route></Route>
                </Routes>
            </main>

        </>
    );
}

export default App;
