// GameRules.js
import React from 'react';
import Paper from '@mui/material/Paper';

const styles = {
  paper: {
    width: '300px',
    height: '100%',
    backgroundColor: '#2196F3', // Use the color from the theme
    position: 'fixed',
    right: 0,
    top: 0,
    padding: '20px',
    paddingTop: '64px', // Add padding to move content below the header
    boxSizing: 'border-box',
    overflowY: 'auto',
    color: '#FFFFFF', // Text color on the rules page
  },
};

const GameRules = ({ showRules, onClose }) => {
  return (
    <Paper style={{ ...styles.paper, display: showRules ? 'block' : 'none' }}>
      <h2>Game Rules</h2>
      {/* Insert your game rules content here */}
      <p>Insert your game rules here...</p>
      {/* You can customize the content based on your needs */}
    </Paper>
  );
};

export default GameRules;
