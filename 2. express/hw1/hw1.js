const express = require('express');
const app = express();
const port = 3000;

const game24Solver = (nums = [], step = "", expectedResult = 24) => {
    let results = []
    if (step === "") step = "" + nums[0]
    if (nums.includes(expectedResult) && nums.length == 1) return [step];
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i != j) {
                let temp = [...nums]
                temp.splice(i > j ? i : j, 1)
                temp.splice(i > j ? j : i, 1)
                if (i == 0 || j == 0) {
                    const makeStep = (op) => i == 0 ? `(${step}${op}${nums[j]})` : `(${nums[i]}${op}${step})`
                    results = [
                        ...results,
                        ...game24Solver([nums[i] + nums[j], ...temp], makeStep('+')),
                        ...game24Solver([nums[i] - nums[j], ...temp], makeStep('-')),
                        ...game24Solver([nums[i] * nums[j], ...temp], makeStep('*')),
                        ...game24Solver([nums[i] / nums[j], ...temp], makeStep('/')),
                    ]
                }
            }
        }
    }
    return results
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
    console.log({ nums })
    for (let i = 0; i < nums.length; i++) {
        if (!/^[1-9]{1,1}$/.exec(nums[i])) {
            return res.status(403).json({
                status: "failed",
                msg: `should enter number in range 0-9, example: ${req.get('host')}/1/2/3/4` 
            })
        }
        nums[i] = parseInt(nums[i])
    }
    const results = game24Solver(nums)
    console.log(results.length)
    res.json({ status: results.length > 0 ? "success" : "failed no result found", results });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

