import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './routes';
import './index.css';
import { MaterialTailwindControllerProvider } from "./context";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <MaterialTailwindControllerProvider>
        
          <AppRouter />
        
      </MaterialTailwindControllerProvider>
    </ThemeProvider>
  </React.StrictMode>
);
