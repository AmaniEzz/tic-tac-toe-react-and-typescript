import React from "react";
import { Board } from "../board";
import { calculateWinner } from "./declairWinner";

type GameProps = {
  value: string;
};

type GameState = {
  history: { squares: string[] | null }[];
  xIsNext: boolean;
  stepNumber: number;
};

export class Game extends React.Component<GameProps, GameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
    if (!step) {
      this.setState({
        history: [
          {
            squares: Array(9).fill(null),
          },
        ],
      });
    }
  }
  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    if (current.squares) {
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares ?? []);
    const moves = history.map((_, move) => {
      const desc = move ? "Go to move #" + move : "Restart the game";
      return (
        <li key={move}>
          <button className="history-btn" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div
        className="game"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
