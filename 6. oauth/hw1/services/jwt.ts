import { sign, verify,  } from 'jsonwebtoken'
import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

export const generateToken = (data: any) => {
    return sign(data, process.env.jwt_secret)
}

export const verifyToken = (token: string) => {
    return new Promise((resolve, reject) => {
        try {
            verify(token, process.env.jwt_secret, (err, res) => {
                if(err) throw err;
                console.log({token, res})
                return resolve(res);
            });
        }
        catch(e) {
            console.log("JWT VERIFY ERROR", e);
            return reject(e);
        }
    })
}