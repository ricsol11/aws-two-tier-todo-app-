require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function escapeHtml(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "No due date";

  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  return String(value).split("T")[0];
}

function renderPage(tasks) {
  const taskRows = tasks
    .map(
      (task) => `
        <li>
          <strong>${escapeHtml(task.task_name)}</strong>
          <p>${escapeHtml(task.task_description)}</p>
          <small>Due date: ${escapeHtml(formatDate(task.due_date))}</small>
        </li>
      `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>AWS Two-Tier To-Do App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: #f4f4f4;
          }

          h1 {
            color: #222;
          }

          form {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
          }

          input, textarea, button {
            width: 100%;
            margin-top: 10px;
            padding: 10px;
            font-size: 16px;
            box-sizing: border-box;
          }

          button {
            background: #232f3e;
            color: white;
            border: none;
            cursor: pointer;
          }

          button:hover {
            background: #37475a;
          }

          ul {
            list-style: none;
            padding: 0;
          }

          li {
            background: white;
            margin-bottom: 15px;
            padding: 15px;
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        <h1>AWS Two-Tier To-Do App</h1>
        <p>Custom Node.js application deployed on AWS EC2 and connected to Amazon RDS MySQL.</p>

        <form action="/tasks" method="POST">
          <h2>Add a New Task</h2>

          <input 
            type="text" 
            name="task_name" 
            placeholder="Task name" 
            required 
          />

          <textarea 
            name="task_description" 
            placeholder="Task description"
          ></textarea>

          <input 
            type="date" 
            name="due_date" 
          />

          <button type="submit">Add Task</button>
        </form>

        <h2>Tasks</h2>

        <ul>
          ${taskRows || "<li>No tasks found.</li>"}
        </ul>
      </body>
    </html>
  `;
}

app.get("/", async (req, res) => {
  try {
    const [tasks] = await pool.query("SELECT * FROM Tasks ORDER BY id DESC");
    res.send(renderPage(tasks));
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection error.");
  }
});

app.post("/tasks", async (req, res) => {
  const { task_name, task_description, due_date } = req.body;

  try {
    await pool.query(
      "INSERT INTO Tasks (task_name, task_description, due_date, completed) VALUES (?, ?, ?, ?)",
      [task_name, task_description || null, due_date || null, false]
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).send("Error adding task.");
  }
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Custom To-Do app running on port ${port}`);
});