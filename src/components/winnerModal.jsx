import React from "react"
import { Square } from "./Square"
export function WinnerModal({ winner, resetGame }) {
    if(winner === null) return null

    const winnerText = winner === false ? 'Draw' : 'Won'
    const winnerIcon = winner || '🤝🏻'

    return (
        <section className="winner">
            <div className="text">
                <h2>
                    {winnerText}
                </h2>
                <header className="win">
                    <Square>{winnerIcon}</Square>
                </header>
                <footer>
                    <button onClick={resetGame}>Reset Game</button>
                </footer>
            </div>
        </section>
    )
}
