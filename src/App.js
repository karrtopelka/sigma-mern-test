import React, { useState } from 'react';
import './App.css';
import { CssBaseline, GeistProvider } from '@geist-ui/react';
import PageLayout from './components/PageLayout/PageLayout';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const [themeType, setThemeType] = useState('light');

  const switchThemes = () => {
    setThemeType((last) => (last === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <GeistProvider themeType={themeType}>
        <CssBaseline />
        <Router>
          <PageLayout switchThemes={switchThemes} themeType={themeType} />
        </Router>
      </GeistProvider>
    </>
  );
};

export default App;
