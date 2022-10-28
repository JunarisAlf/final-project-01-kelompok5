const pool = require('./../config/connection');

class Reflection {
    static async addReflection(id, succes, low_point, take_away, owner_id) {
        const query = "INSERT INTO reflections (id, succes, low_point, take_away, owner_id, created_date, modified_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, succes, low_point, take_away, owner_id, created_date, modified_date";
        const values = [id, succes, low_point, take_away, owner_id, new Date(), new Date()]
        try {
            const res = await pool.query(query, values)
            const data = res.rows[0];
            return {
                "data": data,
                "succeed": true
            }
        } catch (err) {
            return {err}
        }
    }

    static async getReflections(owner_id){
        const query = "SELECT id, succes, low_point, take_away, created_date, modified_date FROM reflections WHERE owner_id=$1";
        const values = [owner_id];
        try {
            const res = await pool.query(query, values);
            return {
                "data": res.rows,
                "succeed": true
            };
        } catch (error) {
            next(error);
        }
    }

    static async updateReflections(succes, low_point, take_away, id){
        const query = "UPDATE reflections SET succes = $1, low_point = $2, take_away = $3, modified_date=$4 WHERE id = $5";
        const values = [succes, low_point, take_away, new Date(), id];
        try {
            const res = await pool.query(query, values);
            const data = res.rows[0];   
            return {
                "data": data,
                "succeed": true
            }
        }catch (err) {
            next(err)
        }
    }

    static async deleteReflections(id) {
        const query = "DELETE FROM reflections WHERE id=$1";
        const values = [id];
        try{
            const res = await pool.query(query, values);
            return {
                "succeed": true
            }
        } catch (error) {
            next(error);
        }
    }
}
module.exports = Reflection;
