import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import {HashRouter, Route, Routes,} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {InitScreen} from "./components/InitScreen";
import {Game} from "./components/Game";


function App() {
    return (<>
            <HashRouter>
                <Routes>
                    <Route path="/pool" element={<Game/>}/>
                    <Route path="/" element={<InitScreen/>}/>
                </Routes>
            </HashRouter>
            <ToastContainer position="bottom-right" autoClose={3000}/>
        </>
    );
}

export default App;
