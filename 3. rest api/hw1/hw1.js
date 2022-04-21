const express = require('express');
const app = express();
app.use(express.json())
const port = 3000;

const employee_data = require('./employee_data.json')

const response = (res, data = undefined, status = 200) => {
    res.status(status).json({ data })
}

const responseError = (res, msg = "error", status = 400) => {
    res.status(status).json({ msg })
}

const findEmployeeIndex = (keyName, findValue) => {
    for (let i = 0; i < employee_data.length; i++) {
        if (employee_data[i][keyName] == findValue) return i;
    }
    return -1;
}

const findEmployee = (keyName, findValue) => {
    const idx = findEmployeeIndex(keyName, findValue)
    return employee_data[idx] ?? null;
}

app.get('/', (req, res) => {
    return response(res);
});

app.get('/getEmployeeData', (req, res) => {
    return response(res, employee_data);
})

app.post('/addEmployeeData', (req, res) => {
    const body = req.body;
    console.log({body})
    if (
        !body ||
        !body["id"] ||
        !body["firstname"] ||
        !body["lastname"] ||
        !body["position"] ||
        !body["tel"] ||
        !body["email"] ||
        false
    ) return responseError(res, "Invalid Input Data")

    if (
        findEmployee('id', body["id"]) ||
        findEmployee('email', body["email"]) ||
        findEmployee('tel', body["tel"]) ||
        false
    ) return responseError(res, "Duplicate Employee Data")

    const newEmployeeData = {
        id: body["id"],
        firstname: body["firstname"],
        lastname: body["lastname"],
        position: body["position"],
        tel: body["tel"],
        email: body["email"],
    }

    employee_data.push(newEmployeeData);

    return response(res)
})

app.put('/updateEmployeeData', (req, res) => {
    const body = req.body;
    console.log({body})
    if (
        !body ||
        !body["id"] ||
        (
            !body["position"] &&
            !body["tel"] &&
            !body["email"] &&
            true
        ) ||
        false
    ) return responseError(res, "Invalid Input Data")

    response(res)
})

app.delete('/deleteEmployeeData', (req, res) => {

})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

