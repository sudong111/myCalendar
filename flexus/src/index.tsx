import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Day from './pages/day';
import Layout from "./components/layout/layout";
import Home from './pages/home';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="day" element={<Day />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

reportWebVitals();
