const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json()); // Middleware to parse JSON

const db = mysql.createConnection({
  host: 'localhost',     // Change if using a remote DB
  user: 'root',          // Your MySQL username
  password: 'Admin@123', // Your MySQL password
  database: 'my_todo_list',   // Your MySQL database name
  port: 3306             // Default MySQL port
});

// **Step 2: Connect to MySQL**
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL Database ✅');
});

app.post("/api/signup", (req, res) => {
  const { username, email, phone, password } = req.body;
  console.log("Received data:", { username, email, phone, password });

  res.status(201).json({ message: "User signed up successfully!" });
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log("Received data:", { username, password });
  
    res.status(200).json({ message: "User login successfully!" });
  });

  app.post("/api/add-task", (req, res) => {
    const { taskname, status } = req.body;

    if (!taskname) {
        console.error("Error: taskname is missing!");
        return res.status(400).json({ error: "Task name is required" });
    }

    console.log("Received task:", { taskname , status});

    const sql = "INSERT INTO todo_list (taskname, status) VALUES (?, ?)";
    db.query(sql, [taskname, status], (err, result) => {
        if (err) {
            console.error("Error inserting task:", err);
            return res.status(500).json({ error: "Database error" });
        }
        console.log("Task added successfully:", { taskname });

        // Send only one response
        res.status(201).json({ message: "Task added successfully!", taskname });
    });
});

app.get("/api/fetchAllTask", (req, res) => {
  const sql = "SELECT * FROM todo_list";
  db.query(sql, (err, result) => {
      if (err) {
          console.error("Error retrieving task:", err);
          return res.status(500).json({ error: "Database error" });
      }
      console.log("successfully fetch all the task list from DB");

      res.status(200).json({ tasks: result });
  });
});

app.put("/api/updateTask", (req, res) => {
  const { taskId, status } = req.body;
  
  if (!taskId) {
      console.error("Error: taskname is missing!");
      return res.status(400).json({ error: "Task name is required" });
  }
  console.log("i'm here..")
  console.log("Received request for update status:", { status });

  const sql = "UPDATE todo_list SET status = ? WHERE id = ?";
  db.query(sql, [status, taskId], (err, result) => {
      if (err) {
          console.error("Error inserting task:", err);
          return res.status(500).json({ error: "Database error" });
      }
      console.log("Task updated successfully:", { taskId, status });

      // Send only one response
      res.status(200).json({ message: "Task updated successfully!", taskId, status });
  });
});

app.put("/api/updateTaskByName", (req, res) => {
  const { taskname, taskId } = req.body;
  console.log("It reached here..")
  if (!taskname) {
      console.error("Error: taskname is missing!");
      return res.status(400).json({ error: "Task name is required" });
  }

  console.log("Received request for update taskName:", { taskname, taskId });

  const sql = "UPDATE todo_list SET taskname = ? WHERE id = ?";
  db.query(sql, [taskname, taskId], (err, result) => {
      if (err) {
          console.error("Error inserting task:", err);
          return res.status(500).json({ error: "Database error" });
      }
      console.log("Taskname updated successfully:", { taskname, taskId });

      if (result.affectedRows > 0) {
        console.log("Taskname updated successfully:", { taskname, taskId });
        res.status(200).json({ message: "Task updated successfully!", taskname, taskId });
      } else {
        console.log("Task not found with id:", taskId);
        res.status(404).json({ message: "Task not found" });
      }
  });
});

app.delete("/api/deleteTask", (req, res) => {
  const { taskname, taskId } = req.body;
  console.log("It reached here..")
  if (!taskname) {
      console.error("Error: taskname is missing!");
      return res.status(400).json({ error: "Task name is required" });
  }

  console.log("Received request for deleting taskName:", { taskname, taskId });

  const sql = "DELETE FROM todo_list WHERE taskname = ?";
  db.query(sql, [taskname], (err, result) => {
      if (err) {
          console.error("Error inserting task:", err);
          return res.status(500).json({ error: "Database error" });
      }
      console.log("Task deleted successfully:", { taskname, taskId });

      if (result.affectedRows > 0) {
        console.log("Task deleted successfully:", { taskname, taskId });
        res.status(200).json({ message: "Task deleted successfully!", taskname, taskId });
      } else {
        console.log("Task not found with id:", taskId);
        res.status(404).json({ message: "Task not found" });
      }
  });
});

app.listen(9001, () => {
    console.log("listening....")
})