import express from "express";
import PedidoController from "../controllers/pedido.controller.js"


const router = express.Router();

//Criar pedido (Q 6)
router.post('/novoPedido', PedidoController.novoPedido);

// Atualizar o pedido (Q 6)
router.patch('/atualizaPedido/:id', PedidoController.atualizaPedido);

// Atualizar a entrega do pedido
router.patch('/atualizaEntrega/:id', PedidoController.entrega);

// Deletar o pedido (Q 8 )
router.delete('/apagarPedido/:id', PedidoController.apagar);

// Buscar pedido específico (Q 9)
router.get('/consultaPedido/:id', PedidoController.consultar);

// Buscar total de venda do Cliente (Q 1 2 6)
router.post('/totalCliente', PedidoController.totalCliente);

// Buscar total de venda do Produto (Q 3 4 7 8)
router.post('/totalProduto', PedidoController.totalProduto);

export default router;