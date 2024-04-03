import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';

type CellType = 'X' | 'O' | null;

const XmixDrixScreen: React.FC = () => {
  const [board, setBoard] = useState<CellType[]>(Array(9).fill(null));
  const [playerX, setPlayerX] = useState<boolean>(true); // Player X starts first
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<CellType | null>(null);

  const currentPlayer = playerX ? 'X' : 'O';
  const statusMessage = gameOver
    ? winner
      ? `Player ${winner} wins!`
      : 'It\'s a draw!'
    : `${currentPlayer} player's turn`;

  const handleCellPress = (index: number) => {
    if (board[index] === null && !gameOver) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setPlayerX(!playerX); // Switch turns
      checkGameOver(newBoard);
    }
  };

  const checkGameOver = (currentBoard: CellType[]) => {
    const winConditions: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];
  
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        // A player has won
        setWinner(currentBoard[a]);
        setGameOver(true);
        Alert.alert('Game Over', `Player ${currentBoard[a]} wins!`, [{ text: 'OK', }]);
        return;
      }
    }
  
    if (!currentBoard.includes(null)) {
      // No empty cells left, it's a draw
      setWinner(null);
      setGameOver(true);
      Alert.alert('Game Over', 'It\'s a draw!', [{ text: 'OK', }]);
    }
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null));
    setPlayerX(true);
    setGameOver(false);
    setWinner(null);
  };

  return (

      <View style={styles.container}>
        <Text style={styles.title}>X Mix Drix</Text>
        <Text style={styles.statusText}>{statusMessage}</Text>
        <View style={styles.board}>
          {[0, 1, 2].map((rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {[0, 1, 2].map((colIndex) => {
                const index = rowIndex * 3 + colIndex;
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.cell}
                    onPress={() => handleCellPress(index)}
                    disabled={board[index] !== null || gameOver}
                  >
                    {board[index] && (
                      <Image
                        source={board[index] === 'X' ? require('./assets/x_symbol.png') : require('./assets/o_symbol.png')}
                        style={styles.symbol}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {gameOver && (
          <View style={styles.statusContainer}>
            <Text style={styles.winnerText}>{statusMessage}</Text>
            <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'rgba(190, 10, 40, 0.727)',
        fontFamily: 'monospace',
    },
  statusText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgba(116, 27, 194, 0.717)',
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgba(116, 218, 14, 0.95)',
  },
  board: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  statusContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  playAgainButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  playAgainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default XmixDrixScreen;
