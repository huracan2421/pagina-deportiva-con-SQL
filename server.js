const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();   // ← Esto lee el archivo .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost', 'http://127.0.0.1', 'http://localhost:5500'],
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ==================== CONEXIÓN A MySQL usando .env ====================
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

console.log('✅ Conectado a MySQL - Base:', process.env.DB_NAME);

// ==================== LOGIN + REGISTRO DE ACTIVIDAD ====================
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    const sql = 'SELECT id, username, name FROM users WHERE username = ? AND password = ?';
    
    db.query(sql, [username.toLowerCase().trim(), password], (err, results) => {
        if (err) {
            console.error("❌ Error en login:", err);
            return res.json({ success: false, message: "Error en el servidor" });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Usuario o contraseña incorrectos" });
        }

        const user = results[0];

        // Registro de login (backup que pide la profe)
        db.query(
            `INSERT INTO login_logs (user_id, username) VALUES (?, ?)`,
            [user.id, user.username]
        );

        console.log(`🔑 Login registrado: ${user.username}`);
        res.json({ success: true, user });
    });
});

// ==================== CHECKOUT (Transacción ACID) ====================
app.post('/api/checkout', (req, res) => {
    const { user_id, total, direccion, telefono, items } = req.body;

    console.log("📥 Compra recibida:", { user_id, total, itemsCount: items?.length });

    if (!user_id || !total || !items || items.length === 0) {
        return res.json({ success: false, message: "Faltan datos de la compra" });
    }

    db.getConnection((err, connection) => {
        if (err) return res.json({ success: false, message: "Error de conexión" });

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return res.json({ success: false, message: "Error al iniciar transacción" });
            }

            connection.query(
                `INSERT INTO orders (user_id, total, direccion, telefono) VALUES (?, ?, ?, ?)`,
                [user_id, total, direccion || null, telefono || null],
                (err, result) => {
                    if (err) {
                        connection.rollback(() => connection.release());
                        return res.json({ success: false, message: "Error al crear pedido" });
                    }

                    const orderId = result.insertId;
                    let completed = 0;
                    let hasError = false;

                    items.forEach(item => {
                        connection.query(
                            `INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)`,
                            [orderId, item.product_id, item.quantity],
                            (err1) => {
                                if (err1) hasError = true;

                                connection.query(
                                    `UPDATE products SET stock = stock - ? WHERE id = ?`,
                                    [item.quantity, item.product_id],
                                    (err2) => {
                                        if (err2) hasError = true;

                                        completed++;
                                        if (completed === items.length) {
                                            if (hasError) {
                                                connection.rollback(() => connection.release());
                                                return res.json({ success: false, message: "Error al guardar items" });
                                            }

                                            connection.commit((err) => {
                                                connection.release();
                                                if (err) {
                                                    res.json({ success: false, message: "Error al confirmar compra" });
                                                } else {
                                                    console.log(`✅ COMPRA GUARDADA - Order #${orderId}`);
                                                    res.json({ success: true, orderId, message: "¡Compra realizada con éxito!" });
                                                }
                                            });
                                        }
                                    }
                                );
                            }
                        );
                    });
                }
            );
        });
    });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});