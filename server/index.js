const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// Serve static files for profile images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Start server
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// API to upload profile picture
app.post("/upload-profile", upload.single("profile_picture"), (req, res) => {
    const userId = req.body.user_id;
    const profilePath = `/uploads/${req.file.filename}`;

    const SQL = "UPDATE users SET profile_image = ? WHERE id = ?";
    db.query(SQL, [profilePath, userId], (err, results) => {
        if (err) {
            console.error("Error updating profile picture:", err);
            res.status(500).json({ error: "Failed to update profile picture" });
        } else {
            res.status(200).json({ message: "Profile picture updated successfully!" });
        }
    });
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
    const { name, role, sort_by = "id", order = "ASC", page = 1, limit = 10 } = req.query;

    const allowedSortBy = ["id", "name", "created_at"];
    const allowedOrder = ["ASC", "DESC"];
    if (!allowedSortBy.includes(sort_by)) {
        return res.status(400).json({ error: "Invalid sort_by parameter" });
    }
    if (!allowedOrder.includes(order.toUpperCase())) {
        return res.status(400).json({ error: "Invalid order parameter" });
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    let SQL = `
        SELECT id, user_name, name, surname, job_position, email_address, profile_image,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
        FROM users
    `;
    const conditions = [];
    const values = [];

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

    SQL += ` ORDER BY ${sort_by} ${order} LIMIT ? OFFSET ?`;
    values.push(parseInt(limit, 10), offset);

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Failed to fetch users" });
        }

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

// API สำหรับอัปโหลดภาพสินค้า
app.post("/products/upload", upload.single("product_image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ message: "Image uploaded successfully", imagePath });
});

// API สำหรับเพิ่มสินค้า
// API for adding products
app.post("/products", upload.single("image"), (req, res) => {
    const {
      category,
      sku,
      productName,
      remark,
      number,
      model,
      color,
      size,
      quantity,
      unit,
      costPrice,
      storageLocation,
      purchaseDate,
      expirationDate,
      status,
    } = req.body;
  
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  
    const SQL = `
      INSERT INTO products (
        category, sku, product_name, remark, image_path,
        number, model, color, size, quantity, unit, cost_price,
        storage_location, purchase_date, expiration_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      category,
      sku,
      productName,
      remark,
      imagePath,
      number,
      model,
      color,
      size,
      quantity,
      unit,
      costPrice,
      storageLocation,
      purchaseDate || null,
      expirationDate || null,
      status,
    ];
  
    db.query(SQL, values, (err, result) => {
      if (err) {
        console.error("Error inserting product:", err);
        return res.status(500).json({ error: "Failed to add product" });
      }
      res.status(201).json({ message: "Product added successfully" });
    });
  });


// API สำหรับเรียกดูสินค้าทั้งหมด
app.get("/products", (req, res) => {
    const { category, sort_by = "id", order = "ASC", page = 1, limit = 10 } = req.query;

    const allowedSortBy = ["id", "product_name", "category", "created_at"];
    const allowedOrder = ["ASC", "DESC"];
    if (!allowedSortBy.includes(sort_by)) {
        return res.status(400).json({ error: "Invalid sort_by parameter" });
    }
    if (!allowedOrder.includes(order.toUpperCase())) {
        return res.status(400).json({ error: "Invalid order parameter" });
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    let SQL = "SELECT * FROM products";
    const conditions = [];
    const values = [];

    if (category) {
        conditions.push("category = ?");
        values.push(category);
    }

    if (conditions.length > 0) {
        SQL += ` WHERE ${conditions.join(" AND ")}`;
    }

    SQL += ` ORDER BY ${sort_by} ${order} LIMIT ? OFFSET ?`;
    values.push(parseInt(limit, 10), offset);

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: "Failed to fetch products" });
        }

        const countSQL = "SELECT COUNT(*) as total FROM products";
        db.query(countSQL, (countErr, countResults) => {
            if (countErr) {
                console.error("Error counting products:", countErr);
                return res.status(500).json({ error: "Failed to count products" });
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

// API สำหรับแก้ไขสินค้า
app.put("/products/:id", (req, res) => {
    const productId = req.params.id;
    const {
        category,
        sku,
        productName,
        remark,
        imagePath,
        details: { number, model, color, size, quantity, unit, costPrice },
        storageLocation,
        purchaseDate,
        expirationDate,
        status,
    } = req.body;

    const SQL = `
        UPDATE products SET
        category = ?, sku = ?, product_name = ?, remark = ?, image_path = ?,
        number = ?, model = ?, color = ?, size = ?, quantity = ?, unit = ?, cost_price = ?,
        storage_location = ?, purchase_date = ?, expiration_date = ?, status = ?
        WHERE id = ?
    `;

    const values = [
        category,
        sku,
        productName,
        remark,
        imagePath,
        number,
        model,
        color,
        size,
        quantity,
        unit,
        costPrice,
        storageLocation,
        purchaseDate,
        expirationDate,
        status,
        productId,
    ];

    db.query(SQL, values, (err, result) => {
        if (err) {
            console.error("Error updating product:", err);
            return res.status(500).json({ error: "Failed to update product" });
        }
        res.status(200).json({ message: "Product updated successfully" });
    });
});

// API สำหรับลบสินค้า
app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;

    const SQL = "DELETE FROM products WHERE id = ?";
    db.query(SQL, [productId], (err, result) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ error: "Failed to delete product" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    });
});

// API สำหรับบันทึกฟอร์มเปรียบเทียบราคา
app.post("/comparison/save", (req, res) => {
    const {
        bookNumber, // เลขที่หนังสือ
        date, // วันที่
        productName, // ชื่อสินค้า
        suppliers, // รายชื่อผู้จัดจำหน่าย
        comment, // หมายเหตุ
        files, // ไฟล์ที่เกี่ยวข้อง
    } = req.body;

    // Validation
    if (!bookNumber || !date || !productName) {
        return res.status(400).json({ error: "กรุณากรอกข้อมูลที่จำเป็น (เลขที่หนังสือ, วันที่, ชื่อสินค้า)" });
    }

    // Insert comparison data
    const comparisonSQL = `
        INSERT INTO comparisons (book_number, date, product_name, comment)
        VALUES (?, ?, ?, ?)
    `;
    db.query(comparisonSQL, [bookNumber, date, productName, comment], (err, result) => {
        if (err) {
            console.error("Error inserting comparison:", err);
            return res.status(500).json({ error: "บันทึกฟอร์มเปรียบเทียบราคาล้มเหลว" });
        }

        const comparisonId = result.insertId;

        // Insert suppliers
        if (suppliers && suppliers.length > 0) {
            const supplierSQL = `
                INSERT INTO suppliers (comparison_id, seller, price, remark)
                VALUES ?
            `;
            const supplierValues = suppliers.map((supplier) => [
                comparisonId,
                supplier.seller,
                supplier.price,
                supplier.remark,
            ]);

            db.query(supplierSQL, [supplierValues], (err) => {
                if (err) {
                    console.error("Error inserting suppliers:", err);
                    return res.status(500).json({ error: "บันทึกข้อมูลผู้จัดจำหน่ายล้มเหลว" });
                }
            });
        }

        // Insert files
        if (files && files.length > 0) {
            const fileSQL = `
                INSERT INTO files (comparison_id, file_name, file_url)
                VALUES ?
            `;
            const fileValues = files.map((file) => [
                comparisonId,
                file.fileName,
                file.fileUrl,
            ]);

            db.query(fileSQL, [fileValues], (err) => {
                if (err) {
                    console.error("Error inserting files:", err);
                    return res.status(500).json({ error: "บันทึกไฟล์ล้มเหลว" });
                }
            });
        }

        res.status(201).json({ message: "บันทึกฟอร์มเปรียบเทียบราคาสำเร็จ" });
    });
});

// API สำหรับดึงข้อมูลฟอร์มเปรียบเทียบราคา
app.get("/comparison", (req, res) => {
    const SQL = `
        SELECT c.*, 
               JSON_ARRAYAGG(JSON_OBJECT('seller', s.seller, 'price', s.price, 'remark', s.remark)) AS suppliers,
               JSON_ARRAYAGG(JSON_OBJECT('fileName', f.file_name, 'fileUrl', f.file_url)) AS files
        FROM comparisons c
        LEFT JOIN suppliers s ON c.id = s.comparison_id
        LEFT JOIN files f ON c.id = f.comparison_id
        GROUP BY c.id
    `;
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Error fetching comparison data:", err);
            return res.status(500).json({ error: "ดึงข้อมูลฟอร์มเปรียบเทียบราคาล้มเหลว" });
        }

        res.status(200).json(results);
    });
});