import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes';
import './index.css';
import { MaterialTailwindControllerProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css" ; 

ReactDOM.createRoot(document.getElementById('root')).render(
   
   <React.StrictMode>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <AppRouter />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
  </React.StrictMode>
)
