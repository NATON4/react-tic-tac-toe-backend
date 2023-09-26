"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 4000;
app.use((0, cors_1.default)());
const initialGameBoard = {
    squares: 'Squares',
    winner: 'No winner yet',
};
const gameSize = {
    sizeToWin: 3,
    boardSize: 5,
};
const winnerInfo = {
    winner: null,
    modalShown: false,
};
const gameInfo = {
    squares: [],
    nextValue: false,
};
app.use(express_1.default.json());
app.post('/update-size-data', (req, res) => {
    try {
        const updatedGameSize = req.body;
        gameSize.sizeToWin = updatedGameSize.sizeToWin;
        gameSize.boardSize = updatedGameSize.boardSize;
        res.status(200).json({ message: 'Board data updated!', updatedGameSize });
    }
    catch (error) {
        console.error('Error:', error);
        console.log(req.body);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/update-winner-data', (req, res) => {
    try {
        const updatedWinnerInfo = req.body;
        winnerInfo.winner = updatedWinnerInfo.winner;
        winnerInfo.modalShown = updatedWinnerInfo.modalShown;
        res.status(200).json({ message: 'Winner data updated!', updatedWinnerInfo });
    }
    catch (error) {
        console.error('Error:', error);
        console.log(req.body);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/update-game-state', (req, res) => {
    try {
        const updatedGameState = req.body.gameState;
        gameInfo.squares = updatedGameState.squares;
        gameInfo.nextValue = updatedGameState.nextValue;
        res.status(200).json({ message: 'Game state updated!' });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/game-board', (req, res) => {
    res.json(initialGameBoard);
});
app.get('/game-size', (req, res) => {
    res.json(gameSize);
});
app.get('/winner-info', (req, res) => {
    res.json(winnerInfo);
});
app.get('/game-state', (req, res) => {
    res.json(gameInfo);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
