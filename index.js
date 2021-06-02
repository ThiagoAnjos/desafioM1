import express from "express";
import pedidoRouter from "./routers/pedido.router.js"

const app = express();
app.use(express.json());

app.use('/pedido', pedidoRouter);



app.listen(3000, () => {
    console.log("API Started on port 3000");
})