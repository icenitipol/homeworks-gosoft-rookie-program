const express = require('express');
const app = express();
const port = 3000;

const resultSolver = (nums = [], expectedResult = 24) => {
    let results = []
    if (expectedResult == (nums[0].value ?? nums[0]) && nums.length == 1) return nums;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i != j) {
                let temp = [...nums];
                temp.splice(i > j ? i : j, 1);
                temp.splice(i > j ? j : i, 1);
                const makeStep = (op, fn) => ({
                    value: fn(nums[i].value ?? nums[i], nums[j].value ?? nums[j]),
                    step: `(${nums[i].step ?? nums[i]}${op}${nums[j].step ?? nums[j]})`,
                });
                results = [
                    ...results,
                    ...resultSolver([...temp, makeStep('+', (a, b) => (a + b))]),
                    ...resultSolver([...temp, makeStep('-', (a, b) => (a - b))]),
                    ...resultSolver([...temp, makeStep('*', (a, b) => (a * b))]),
                    ...resultSolver([...temp, makeStep('/', (a, b) => (a / b))]),
                ]
            }
        }
    }
    return results.map(e=>e.step??e)
}

app.get('/', (req, res) => {
    res.send(
        `use ${req.get('host')}/[number1]/[number2]/[number3]/[number4] <br>` +
        `example: ${req.get('host')}/1/2/3/4`
    );
});

app.get('/:n1/:n2/:n3/:n4', (req, res) => {
    const p = req.params
    const nums = [p.n1, p.n2, p.n3, p.n4]
    console.log('\n',{ nums })
    for (let i = 0; i < nums.length; i++) {
        if (!/^[1-9]{1,1}$/.exec(nums[i])) {
            return res.status(403).json({
                status: "failed",
                msg: `should enter number in range 0-9, example: ${req.get('host')}/1/2/3/4`
            })
        }
        nums[i] = parseInt(nums[i])
    }
    const results = resultSolver(nums)
    console.log("TOTAL RESULT FOUND: ", results.length)
    res.json({ status: results.length > 0 ? "success" : "failed no result found", count: results.length, results });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});