import { responseError, responseOk } from './services/response';
import { allKeyExists, anyKeyExists } from './services/util';
import { getEmployee, newEmployee, removeEmployee, updateEmployee } from './services/employee';
import { generateToken, verifyToken } from './services/jwt';
import { handleSqlError } from './services/mysql';
import { config as dotenvConfig } from 'dotenv';
import * as express from 'express';
dotenvConfig()

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    if (req.path == "/login") return next();
    const responseUnauthorized = () => responseError(res, "UNAUTHORIZED")
    const authHeader = req.headers.authorization
    const token = authHeader ? authHeader.split(' ')[1] : null
    if (!token) return responseUnauthorized()
    verifyToken(token).then(()=>next()).catch(responseUnauthorized)
})

app.get('/', (req, res) => {
    return responseOk(res);
});

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) return responseError(res, 'Invalid Input Data')
    if (req.body.username == "admin" && req.body.password == "password") {
        const token = generateToken({ username: req.body.username })
        return responseOk(res, { data: token })
    }
    responseError(res, "Username/Password Invalid")
});

app.get('/getEmployeeData', (req, res) => {
    getEmployee()
        .then(employee => responseOk(res, employee))
        .catch(err => responseError(res, handleSqlError(err)))
})

app.post('/addEmployeeData', (req, res) => {
    const body = req.body;
    const required = ["firstname", "lastname", "position", "tel", "email"];
    if (!allKeyExists(body, required)) return responseError(res, "Invalid Input Data")

    newEmployee({
        fname: body["firstname"],
        lname: body["lastname"],
        pos: body["position"],
        tel: body["tel"],
        email: body["email"],
    })
        .then(() => { responseOk(res) })
        .catch((err) => responseError(res, handleSqlError(err)))
})

app.put('/updateEmployeeData', (req, res) => {
    const body = req.body;
    const required = ["position", "tel", "email"];
    if (!body["id"] || !anyKeyExists(body, required)) return responseError(res, "Invalid Input Data")

    updateEmployee({
        id: body['id'],
        email: body['email'],
        pos: body['position'],
        tel: body['tel'],
    })
        .then((result) => {
            if (result.affectedRows == 0) return responseError(res, "Employee Not Found")
            return responseOk(res)
        })
        .catch((err) => responseError(res, handleSqlError(err)))
})

app.delete('/deleteEmployeeData', (req, res) => {
    const body = req.body;
    if (!body["id"]) return responseError(res, "Invalid Input Data")

    removeEmployee(body['id'])
        .then((result) => {
            if (result.affectedRows == 0) return responseError(res, "Employee Not Found")
            return responseOk(res)
        })
        .catch((err) => responseError(res, handleSqlError(err)))
})

app.listen(process.env.port, () => {
    console.log(`Listening on port: ${process.env.port}`);
});

