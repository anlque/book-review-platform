const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const https = require('https');
const http = require('http');

const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
};

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Makes small delay to imitate real api
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// Login endpoint
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

function isGuestAllowedBooksFlowRequest(req) {
    if (req.method !== 'GET') {
        return false;
    }
    const path = req.path || '';
    if (path === '/books' || path.startsWith('/books/')) {
        return true;
    }
    if (/^\/books\/[^/]+\/review-stats$/.test(path)) {
        return true;
    }
    if (path === '/authors' || path.startsWith('/authors/')) {
        return true;
    }
    if (path === '/book-reviews') {
        return true;
    }
    if (path === '/review-comments') {
        return true;
    }
    return false;
}

server.get('/books/:id/review-stats', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const bookId = req.params.id;
        const reviews = (db['book-reviews'] || []).filter(
            (review) => String(review.bookId) === String(bookId),
        );
        const ratingsCount = reviews.length;
        const reviewsCount = reviews.filter(
            (review) => review.text && String(review.text).trim().length > 0,
        ).length;
        const average = ratingsCount
            ? reviews.reduce((sum, review) => sum + Number(review.rate || 0), 0) / ratingsCount
            : 0;
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((review) => {
            const rate = Number(review.rate);
            if (counts[rate] !== undefined) {
                counts[rate] += 1;
            }
        });
        const distribution = {
            5: ratingsCount ? Math.round((counts[5] / ratingsCount) * 100) : 0,
            4: ratingsCount ? Math.round((counts[4] / ratingsCount) * 100) : 0,
            3: ratingsCount ? Math.round((counts[3] / ratingsCount) * 100) : 0,
            2: ratingsCount ? Math.round((counts[2] / ratingsCount) * 100) : 0,
            1: ratingsCount ? Math.round((counts[1] / ratingsCount) * 100) : 0,
        };
        return res.json({
            average: Math.round(average * 10) / 10,
            ratingsCount,
            reviewsCount,
            distribution,
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// Check if the user is authorized
// eslint-disable-next-line
server.use((req, res, next) => {
    if (isGuestAllowedBooksFlowRequest(req)) {
        return next();
    }
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);

// Run server
const PORT = 8443;
const HTTP_PORT = 8000;

const httpsServer = https.createServer(options, server);
const httpServer = http.createServer(server);

httpsServer.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`);
});

httpServer.listen(HTTP_PORT, () => {
    console.log(`server is running on ${HTTP_PORT} port`);
});
