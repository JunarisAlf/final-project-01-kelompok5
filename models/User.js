const pool = require('./../config/connection');

class User {
    static async addUser(email, password) {
        const query = "INSERT INTO users (email, password) VALUES ($1, $2)";
        const values = [email, password]
        try {
            const res = await pool.query(query, values)
            return {
                "succeed": true
            }
        } catch (err) {
            return {err}
        }

    }

    static async getUser(email){
        const query = "SELECT id, email, password FROM users WHERE email=$1";
        const values = [email]
        try {
            const res = await pool.query(query, values)
            return res.rows[0]
        } catch (err) {
            return {err}
        }
    }
}
module.exports = User;
