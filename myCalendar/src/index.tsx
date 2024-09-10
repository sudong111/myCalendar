import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
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
            <Route path="/myCalendar" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

reportWebVitals();
