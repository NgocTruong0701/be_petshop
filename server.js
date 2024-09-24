import app from './src/app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`BE PET SHOP start with port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() =>
        console.log('Exist Server Express'))
});