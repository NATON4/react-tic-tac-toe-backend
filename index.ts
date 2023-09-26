import express, { Express, Request, Response } from 'express';

import cors from "cors";

const app: Express = express();
const port = 4000;
app.use(cors());

type GameBoard = {
    squares: string;
    winner: string;
}

const initialGameBoard: GameBoard = {
    squares: 'Squares',
    winner: 'No winner yet',
};

type GameSize = {
    sizeToWin: number;
    boardSize: number;
}

const gameSize: GameSize = {
    sizeToWin: 3,
    boardSize: 3,
};

type WinnerInfo = {
    winner: string | null;
    modalShown: boolean;
}

const winnerInfo: WinnerInfo = {
    winner: null,
    modalShown: false,
}

type GameInfo = {
    squares: (string | null)[];
    nextValue: boolean;
}

const gameInfo: GameInfo = {
    squares: [],
    nextValue: false,
}

app.use(express.json());

app.post('/update-size-data', (req: Request, res: Response) => {
    try {
        const updatedGameSize: GameSize = req.body;

        gameSize.sizeToWin = updatedGameSize.sizeToWin;
        gameSize.boardSize = updatedGameSize.boardSize;

        res.status(200).json({ message: 'Board data updated!', updatedGameSize });
    } catch (error) {
        console.error('Error:', error);
        console.log(req.body);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/update-winner-data', (req: Request, res: Response) => {
    try {
        const updatedWinnerInfo: WinnerInfo = req.body;

        winnerInfo.winner = updatedWinnerInfo.winner;
        winnerInfo.modalShown = updatedWinnerInfo.modalShown;

        res.status(200).json({ message: 'Winner data updated!', updatedWinnerInfo });
    } catch (error) {
        console.error('Error:', error);
        console.log(req.body);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/update-game-state', (req: Request, res: Response) => {
    try {
        const updatedGameState = req.body.gameState;

        gameInfo.squares = updatedGameState.squares;
        gameInfo.nextValue = updatedGameState.nextValue;

        res.status(200).json({ message: 'Game state updated!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/game-board', (req: Request, res: Response) => {
    res.json(initialGameBoard);
});

app.get('/game-size', (req: Request, res: Response) => {
    res.json(gameSize);
});

app.get('/winner-info', (req: Request, res: Response) => {
    res.json(winnerInfo);
});

app.get('/game-state', (req: Request, res: Response) => {
    res.json(gameInfo);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
