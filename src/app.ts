import express from "express";

// Expressを使う
const app = express();

// JSONを使えるようにする
app.use(express.json());

// ポートを指定する
const PORT = process.env.PORT || 3000;

// ルートを設定する
app.get("/", (req, res)=>{
  res.send("Hello World");
})

// サーバーを起動する
app.listen(PORT, ()=>{console.log(`Server is runnning on port ${PORT}`)})
