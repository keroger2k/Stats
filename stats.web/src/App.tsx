import TopNavbar from './components/TopNavbar';
import MainContainer from './components/MainContainer';
import { Routes, Route } from 'react-router-dom';
import TeamScheduleContainer from './components/TeamScheduleContainer';
import './App.scss';
import TeamInfoContainer from './components/TeamInfoContainer';
import TeamSeasonContainer from './components/TeamSeasonContainer';

function App() {

    return (
        <>
            <TopNavbar></TopNavbar>
            <Routes>
                <Route path="/" element={<MainContainer />}></Route>
                <Route path="/teams/:id/schedule" element={<TeamScheduleContainer />}></Route>
                <Route path="/teams/:id/teamInfo" element={<TeamInfoContainer />}></Route>
                <Route path="/teams/:id/season-stats" element={<TeamSeasonContainer />}></Route>
                <Route></Route>
            </Routes>

        </>
    );
}

export default App;
