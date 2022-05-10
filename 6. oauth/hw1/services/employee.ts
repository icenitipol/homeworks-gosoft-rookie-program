import { QueryError, ResultSetHeader } from 'mysql2';
import { pool } from './mysql';

type EmployeeData = {
    id: string,
    fname: string,
    lname: string,
    tel: string,
    email: string,
    pos: string
}

type UpdateEmployeeData = {
    id: string,
    tel?: string,
    email?: string,
    pos?: string
}

type RejectQueryError = (reason?: QueryError) => void

export const getEmployee = () => {
    return new Promise((resolve, reject: RejectQueryError) => {
        const sql = "SELECT * FROM EMPLOYEE";
        pool.query(sql, (err, res) => {
            if (err) return reject(err); 
            return resolve(res);
        });
    })
}

export const newEmployee = (data: Omit<EmployeeData, "id">): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject: RejectQueryError) => {
        const sql = "INSERT INTO EMPLOYEE(ID, FIRSTNAME, LASTNAME, TEL, EMAIL, POSITION) VALUE (:id, :fname, :lname, :tel, :email, :pos)";
        pool.query(sql, {
            fname: data.fname,
            lname: data.lname,
            tel: data.tel,
            email: data.email,
            pos: data.pos
        }, (err, res) => {
            if (err) return reject(err); 
            return resolve(res as ResultSetHeader);
        });
    })
}

export const updateEmployee = (data: UpdateEmployeeData): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject: RejectQueryError) => {
        let setting = ""
        if (data.email) setting += "EMAIL = :email,"
        if (data.tel) setting += "TEL = :tel,"
        if (data.pos) setting += "POSITION = :pos,"
        const sql = "UPDATE EMPLOYEE SET " + setting.slice(0, -1) + " WHERE ID = :id";
        pool.query(sql, {
            id: data.id,
            tel: data.tel,
            email: data.email,
            pos: data.pos
        }, (err, res) => {
            if (err) return reject(err); 
            return resolve(res as ResultSetHeader);
        });
    })
}

export const removeEmployee = (id: string): Promise<ResultSetHeader> => {
    return new Promise((resolve, reject: RejectQueryError) => {
        const sql = "DELETE FROM EMPLOYEE WHERE ID = :id";
        pool.query(sql, { id }, (err, res) => {
            if (err) return reject(err); 
            return resolve(res as ResultSetHeader);
        });
    })
}