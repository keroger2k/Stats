import TopNavbar from './components/TopNavbar';
import MainContainer from './components/MainContainer';
import { ThemeProvider } from 'react-bootstrap';
import './App.scss';

function App() {
    return (
    <>
        <TopNavbar></TopNavbar>
        <MainContainer></MainContainer>
    </>
  );
}

export default App;
