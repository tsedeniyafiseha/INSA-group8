const db = require('../database/db');

const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE username = ? COLLATE NOCASE`;
    db.get(query, [username], (err, row) => {
      if (err) return reject(err);
      resolve(row || null);
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ? COLLATE NOCASE`;
    db.get(query, [email], (err, row) => {
      if (err) return reject(err);
      resolve(row || null);
    });
  });
};


const createUser = (username, email, hashedPassword, role, createdAt) => {
    return new Promise((resolve, reject) => {
        const insertQuery = `INSERT INTO users (username, email, password, role, created_at, verified) VALUES (?, ?, ?, ?, ?, 0)`
        db.run(insertQuery, [username, email, hashedPassword, role, createdAt], function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
        });
    });
};

const verifyEmail = (email) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `UPDATE users SET verified = 1 WHERE email = ?`;
        db.run(updateQuery, [email], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const checkQuery = `SELECT id, username, email, role, verified FROM users WHERE id = ?`;
        db.get(checkQuery, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
        });
    });
};

const updateUserRole = (id, role) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `UPDATE users SET role = ? WHERE id = ?`;
        db.run(updateQuery, [role, id], function(err){
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

const updatePasswordByEmail = (email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `UPDATE users SET password = ? WHERE email = ?`
        db.run(updateQuery, [hashedPassword, email], function(err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

const countByRole = (role) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS count FROM users WHERE role = ?`;
        db.get(query, [role], (err, row) => {
            if (err) return reject(err);
            resolve(row.count);
        });
    });
};

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
  verifyEmail,
  updateUserRole,
  findById,
  updatePasswordByEmail,
  countByRole
};