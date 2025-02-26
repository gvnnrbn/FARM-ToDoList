import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import './index.css'
import Lists from './Lists.jsx'
import Items from './Items.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Navigate to="/list" replace />} />
      <Route path="list" element={<Lists />} />
      <Route path="list/:listId" element={<Items />} />
    </Routes>
  </BrowserRouter>,
)
