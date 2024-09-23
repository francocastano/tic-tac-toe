import './App.css'
import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { turns, winnerCombos } from './constants'
import { checkWinner } from './logic/board'
import { Square } from './components/Square'
import { WinnerModal } from './components/winnerModal'
import { checkEndGame } from './logic/board'



function App() {
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        if (boardFromStorage) return JSON.parse(boardFromStorage)
        return Array(9).fill(null)
    })
    const [winner, setWinner] = useState(null)
    const [turn, setTurn] = useState(() => {
        const turnFormStorage = window.localStorage.getItem('turn')
        return turnFormStorage ?? turns.x
    })



    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(turns.X)
        setWinner(null)

        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
    }

    const updateBoard = (index) => {
        if (board[index] || winner) {
            return
        }

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === turns.X ? turns.O : turns.X
        setTurn(newTurn)

        window.localStorage.setItem('board', JSON.stringify(newBoard))
        window.localStorage.setItem('turn',newTurn)

        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner) 
        } else if (checkEndGame(newBoard)){
            setWinner(false)
        }
    }
    return (
        <main className='board'>
            <h1>Tic tac toe</h1>
            <button onClick={resetGame}>Reset the game</button>
            <section className='game'>
                {
                    board.map((square, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}>
                                {square}
                            </Square>
                        )
                    })
                }
            </section>

            <section className='turn'>
                <Square isSelected={turn === turns.X}>{turns.X}</Square>
                <Square isSelected={turn === turns.O}>{turns.O}</Square>
            </section>
            <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
        </main>
    )
}

export default App
