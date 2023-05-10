import TopNavbar from './components/TopNavbar';
import MainContainer from './components/MainContainer';
import { Routes, Route } from 'react-router-dom';
import TeamScheduleContainer from './components/TeamScheduleContainer';
import TeamInfoContainer from './components/TeamInfoContainer';
import TeamSeasonContainer from './components/TeamSeasonContainer';
import OpponentsContainer from './components/OpponentsContainer';

import './App.scss';

function App() {

    return (
        <>
            <TopNavbar></TopNavbar>
            <Routes>
                <Route path="/" element={<MainContainer />}></Route>
                <Route path="/teams/:id/schedule" element={<TeamScheduleContainer />}></Route>
                <Route path="/teams/:id/teamInfo" element={<TeamInfoContainer />}></Route>
                <Route path="/teams/:id/season-stats" element={<TeamSeasonContainer />}></Route>
                <Route path="/teams/opponents" element={<OpponentsContainer />}></Route>
                <Route></Route>
            </Routes>

        </>
    );
}

export default App;
