import TopNavbar from './components/TopNavbar';
import MainContainer from './components/MainContainer';
import { Routes, Route } from 'react-router-dom';
import TeamContainer from './components/TeamContainer';

import './App.scss';

function App() {

    

    return (
        <>
            <TopNavbar></TopNavbar>
            <Routes>
                <Route path="/" element={<MainContainer />}></Route>
                <Route path="/teams/:id" element={<TeamContainer />}></Route>
                <Route></Route>
            </Routes>

        </>
    );
}

export default App;
