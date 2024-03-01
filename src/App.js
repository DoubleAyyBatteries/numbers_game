<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
=======
// App.js
import React, { useState, useEffect } from 'react';
import PlayerInput from './PlayerInput';
import GameInfo from './GameInfo';
import GameRules from './GameRules';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3', // Use a more bluish shade
    },
    background: {
      default: '#2C2C2C', // Slightly brighter black background
    },
    infoPage: {
      main: '#2196F3', // Use the same color as the header
    },
  },
});

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    marginTop: '64px',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  infoButton: {
    marginRight: '20px',
  },
};

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [playerScores, setPlayerScores] = useState({});
  const [totalSum, setTotalSum] = useState(0);
  const [winner, setWinner] = useState(null);
  const [roundWinner, setRoundWinner] = useState(null);
  const [showRules, setShowRules] = useState(false);

  // Fetch the round winner and overall winner from the server
  const fetchGameInfo = async () => {
    try {
      const response = await fetch('/api/game-info'); // Update with your server endpoint
      const data = await response.json();
      setRoundWinner(data.roundWinner);
      setWinner(data.gameWinner);
    } catch (error) {
      console.error('Error fetching game info:', error);
    }
  };

  // Handle user input and update the numbers array
  const handleUserInput = (number) => {
    setNumbers([...numbers, parseInt(number, 10)]);
  };

  // Calculate total sum and fetch game info when the numbers array changes
  useEffect(() => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    setTotalSum(sum * 0.4);
    fetchGameInfo();
  }, [numbers]);

  // Determine the round winner based on the calculated number
  useEffect(() => {
    if (totalSum !== null && numbers.length >= 2) {
      const closestPlayer = findClosestPlayer(numbers, totalSum);
      setRoundWinner(closestPlayer);
    }
  }, [totalSum, numbers]);

  // Update player scores and reset for the next round
  useEffect(() => {
    if (roundWinner) {
      setPlayerScores((prevScores) => ({
        ...prevScores,
        [roundWinner]: prevScores[roundWinner] + 1,
      }));

      // Check for the overall winner
      if (playerScores[roundWinner] === 4) {
        setWinner(roundWinner);
      }

      // Reset for the next round
      setRoundWinner(null);
      setNumbers([]);
    }
  }, [roundWinner, playerScores]);

  // Helper function to find the player with the closest number to the calculated number
  const findClosestPlayer = (numbers, calculatedNumber) => {
    const closestPlayer = numbers.reduce((prevPlayer, currentPlayer) => {
      const prevDifference = Math.abs(prevPlayer - calculatedNumber);
      const currentDifference = Math.abs(currentPlayer - calculatedNumber);
      return currentDifference < prevDifference ? currentPlayer : prevPlayer;
    });

    return closestPlayer;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" style={styles.title}>
              Numbers Game
            </Typography>
            <Tooltip title="Game Rules">
              <IconButton style={styles.infoButton} onClick={() => setShowRules(!showRules)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div style={styles.container}>
          <PlayerInput onInput={handleUserInput} existingNumbers={numbers.map((num) => num.number)} />
          <GameInfo
            totalSum={totalSum}
            roundWinner={roundWinner}
            winner={winner}
            playerScores={playerScores}
          />
        </div>
        <GameRules showRules={showRules} onClose={() => setShowRules(false)} />
      </div>
    </ThemeProvider>
  );
};

export default App;
>>>>>>> 0643d2f (test)
