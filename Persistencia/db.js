const mysql = require('mysql');

class Database {
    constructor() {
        this.config = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'dbcolonias'
        };
        this.pool = mysql.createPool(this.config);
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    query(queryString, params) {
        return new Promise((resolve, reject) => {
            this.pool.query(queryString, params, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.pool.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = Database;
