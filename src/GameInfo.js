// GameInfo.js
import React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const styles = {
  paper: {
    padding: '20px',
    margin: '20px',
    backgroundColor: '#2196F3', // Use the color from the theme
    color: '#FFFFFF', // Text color on the info page
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #FFFFFF',
  },
};

const GameInfo = ({ totalSum, roundWinner, winner, playerScores }) => {
  return (
    <Paper style={styles.paper}>
      <h2>Game Info</h2>
      <p>The Ultimate Number: {totalSum}</p>
      <p>Round Winner: {roundWinner}</p>
      <p>Winner: {winner}</p>
      <List>
        <h3>Player Points:</h3>
        {Object.entries(playerScores).map(([player, points]) => (
          <ListItem key={player} style={styles.listItem}>
            <span>{player}</span>
            <span>{points} points</span>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default GameInfo;
