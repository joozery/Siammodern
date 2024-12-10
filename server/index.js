const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// Database connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "siampalm",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Stop the server if the database connection fails
    }
    console.log("Connected to the database.");
});

// Start server
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Register user
app.post("/register", async (req, res) => {
    const {
        user_name,
        password,
        name,
        surname,
        phone,
        email_address,
        job_position,
        role,
        access_permissions = [],
        address_number,
        address_lane,
        address_road,
        address_subdistrict,
        address_area,
        address_province,
        address_postcode,
        profile_picture,
    } = req.body;

    // Validation
    if (!user_name || !password || !name || !email_address) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const accessPermissionsJSON = JSON.stringify(access_permissions);

        const SQL = `
            INSERT INTO users (
                user_name, password, name, surname, phone, email_address,
                job_position, role, access_permissions,
                address_number, address_lane, address_road, address_subdistrict,
                address_area, address_province, address_postcode, profile_image
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            user_name,
            hashedPassword,
            name,
            surname,
            phone,
            email_address,
            job_position,
            role,
            accessPermissionsJSON,
            address_number,
            address_lane,
            address_road,
            address_subdistrict,
            address_area,
            address_province,
            address_postcode,
            profile_picture,
        ];

        db.query(SQL, values, (err, results) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).json({ error: "Failed to register user" });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Error during registration" });
    }
});

// Login user
app.post("/login", (req, res) => {
    const { user_name, password } = req.body;

    // Validation
    if (!user_name || !password) {
        return res.status(400).json({ error: "Please provide username and password" });
    }

    const SQL = "SELECT * FROM users WHERE user_name = ?";
    db.query(SQL, [user_name], async (err, results) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Server error during login" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                user_name: user.user_name,
                name: user.name,
                email_address: user.email_address,
                role: user.role,
            },
        });
    });
});

// Fetch users with filters, sorting, and pagination
app.get("/users", (req, res) => {
    const {
        name,
        role,
        sort_by = "id",
        order = "ASC",
        page = 1,
        limit = 10,
    } = req.query;

    // Validate inputs
    const allowedSortBy = ["id", "name", "created_at"];
    const allowedOrder = ["ASC", "DESC"];
    if (!allowedSortBy.includes(sort_by)) {
        return res.status(400).json({ error: "Invalid sort_by parameter" });
    }
    if (!allowedOrder.includes(order.toUpperCase())) {
        return res.status(400).json({ error: "Invalid order parameter" });
    }

    // Calculate offset for pagination
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    let SQL = `
        SELECT id, user_name, name, surname, job_position, email_address, 
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at 
        FROM users
    `;
    const conditions = [];
    const values = [];

    // Add filters
    if (name) {
        conditions.push("name LIKE ?");
        values.push(`%${name}%`);
    }
    if (role) {
        conditions.push("role = ?");
        values.push(role);
    }

    if (conditions.length > 0) {
        SQL += ` WHERE ${conditions.join(" AND ")}`;
    }

    // Add sorting and pagination
    SQL += ` ORDER BY ${sort_by} ${order} LIMIT ? OFFSET ?`;
    values.push(parseInt(limit, 10), offset);

    // Execute query
    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Failed to fetch users" });
        }

        // Fetch total count for pagination
        const countSQL = "SELECT COUNT(*) as total FROM users";
        db.query(countSQL, (countErr, countResults) => {
            if (countErr) {
                console.error("Error counting users:", countErr);
                return res.status(500).json({ error: "Failed to count users" });
            }

            const total = countResults[0].total;
            res.status(200).json({
                total,
                currentPage: parseInt(page, 10),
                totalPages: Math.ceil(total / limit),
                data: results,
            });
        });
    });
});
