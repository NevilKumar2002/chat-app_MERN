const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
// const userRoutes= require("./routes/auth");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");
const app= express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

const PORT= process.env.PORT || 8005;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


.then(()=>{
    console.log("DB connected Sucessfully")
})
.catch(err=>{
    console.log("Error connecting to DB:"+ err.message);
})
app.use('/api/auth',authRoutes);
app.use("/api/messages", messageRoutes);
app.post("/",(req,res)=>{
    return res.send("Dash Board Page")

})
// app.listen(PORT, ()=>{
//     console.log("Server is Running on PORT "+ PORT);
    

// })
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});