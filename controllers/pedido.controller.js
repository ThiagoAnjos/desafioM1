import { request, response } from "express";
import PedidoService from "../services/pedido.service.js"

/*async function totalCliente(request, response, next) {
    const nome = request.body.cliente;
    if (!nome) {
        response.status(400).send({ error: "Favor, informar um cliente" })
    } else {

    }
}*/

async function novoPedido(request, response, next) {
    const pedido = {
        'cliente': request.body.cliente,
        'produto': request.body.produto,
        'valor': parseFloat(request.body.valor),
        'entregue': false,
        'timestamp': new Date()
    }
    response.send(await PedidoService.createNewPedido(pedido));

}

async function atualizaPedido(request, response, next) {
    const id = request.params.id;
    const pedido = {
        'id': id,
        'cliente': request.body.cliente,
        'produto': request.body.produto,
        'valor': request.body.valor,
        'entregue': request.body.entregue
    }
    response.send(await PedidoService.atualizaPedido(pedido));
}

async function entrega(request, response, next) {
    const id = request.params.id;
    const entregue = request.body.entregue;
    if (entregue == true || entregue == false) {
        response.send(await PedidoService.atualizaEntrega(id, entregue))
    } else {
        response.send(`Valor inválido para o campo Entregue. Favor, informar true ou false. Valor informado ${entregue}`)
    }

}

async function apagar(request, response, next) {
    const id = request.params.id;
    response.send(await PedidoService.apagarPedido(id));

}
async function consultar(request, response, next) {

    const id = request.params.id;
    response.send(await PedidoService.consultarPedido(id));

}

async function totalCliente(request, response, next) {
    const cliente = request.body.cliente;
    if (!cliente) {
        response.send('Cliente não informado!');
    } else {
        response.send(await PedidoService.totalCliente(cliente));
    }

}

async function totalProduto(request, response, next) {
    const produto = request.body.produto;
    response.send(await PedidoService.totalProduto(produto))

}

export default { totalCliente, novoPedido, atualizaPedido, entrega, apagar, consultar, totalCliente, totalProduto };