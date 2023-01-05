//Library
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//User-Components
import './styles/App.css';
import Home from './components/Home';
import Login from './components/Login';
import { useAuth } from './utils/context/AuthContext';

function App() {

    //Get status of user from AuthContext
    const user = useAuth(); 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user.user ? <Home /> : <Login />} />
                <Route path="/Login" element={user.user ? <Home /> : <Login />} />
                <Route path="/Home" element={user.user ? <Home /> : <Login />} />
                <Route path="*" element={user.user ? <Home /> : <Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
