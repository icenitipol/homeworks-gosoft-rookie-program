const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const port = 3000;
const jwtkey = "MYKEYBABY"

const responseOk = (res, data = {}) => {
    res.status(data.status ?? 200).json({
        message: data.message ?? "OK",
        data: data.data ?? undefined
    })
}

const responseError = (res, message = "Error", status = 400) => {
    res.status(status).json({ message })
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

app.get('/data', (req, res) => {
    res.sendFile(__dirname + '/views/data.html')
})

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) return responseError(res, 'Invalid Input Data')
    if (req.body.username == "admin" && req.body.password == "password") {
        const token = jwt.sign({
            username: "admin"
        }, jwtkey)
        return responseOk(res, { data: token })
    }
    responseError(res, "Username/Password Invalid")
});

app.get('/getData', (req, res) => {
    const token = req.headers.authorization;
    if (!token) return responseError(res)
    try {
        const validatedResult = jwt.verify(token.split(' ')[1], jwtkey, {})
        if (validatedResult.username == "admin") {
            return responseOk(res, { data: "DATA" })
        }
        return responseError(res, "UNAUTHORIZED")
    }
    catch {
        return responseError(res, "INVALID TOKEN")
    }
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

