import PedidoRepository from '../repositories/pedido.repository.js'

async function createNewPedido(pedido) {
    const data = await PedidoRepository.getFile();
    pedido = { id: data.nextId++, ...pedido };
    data.pedidos.push(pedido);
    await PedidoRepository.createPedido(data);
    return pedido;
}

async function atualizaPedido(pedido) {
    const data = await PedidoRepository.getFile();
    const pedidos = data.pedidos;
    const index = pedidos.findIndex(p => p.id == pedido.id);
    if (index == -1) {
        return `Pedido inexistente`
    } else if (pedidos[index].produto == pedido.produto) {
        pedidos[index].cliente = pedido.cliente;
        pedidos[index].valor = pedido.valor;
        pedidos[index].entregue = pedido.entregue;
        await PedidoRepository.createFile(data);
        //return pedidos[index];
        return `Pedido atualizado`
    } else {
        return `Produto ${pedido.produto} inexistente no pedido ${pedido.id}`
    }

}

async function atualizaEntrega(id, entregue) {

    const data = await PedidoRepository.getFile();
    const pedidos = data.pedidos;
    const index = pedidos.findIndex(p => p.id == id);

    if (entregue == 1) {
        entregue = true;
    } else {
        entregue = false;
    }

    pedidos[index].entregue = entregue;
    await PedidoRepository.createFile(data);
    return `Entrega Atualizada | Pedido: ${id} | Status: ${entregue}`;
}

async function apagarPedido(id) {
    const data = await PedidoRepository.getFile();
    const pedidos = data.pedidos;
    const index = pedidos.findIndex(p => p.id == id);

    if (index == -1) {
        return (`Pedido ${id} informado não existe!`)
    } else {
        pedidos.splice(index, 1);
        await PedidoRepository.createFile(data);
        return (`Pedido ${id} deletado com sucesso!`)

    }
}

async function consultarPedido(id) {

    const pedidos = await PedidoRepository.getPedidos();
    const index = pedidos.findIndex(p => p.id == id);

    if (index == -1) {
        return `Pedido ${id} informado não existe`;
    } else {
        return pedidos[index];
    }

}

async function totalCliente(cliente) {
    const pedidos = await PedidoRepository.getPedidos();
    let total = 0;
    let numPedidos = 0;

    pedidos.forEach(e => {
        if (e.cliente?.toUpperCase() == cliente.toUpperCase() && e.entregue) {
            numPedidos++;
            total = total + e.valor;
        }
    });

    return `Cliente: ${cliente} | Total de Pedidos: ${numPedidos} | Valor total: R$${total} | Média por pedido: R$${(total / numPedidos).toFixed(2)}`;
}

async function totalProduto(produto) {
    const pedidos = await PedidoRepository.getPedidos();
    let total = 0;
    let numPedidos = 0;

    pedidos.forEach(e => {
        if (e.produto?.toUpperCase() == produto.toUpperCase() && e.entregue) {
            numPedidos++;
            total = total + e.valor;
        }
    });
    if (numPedidos != 0) {
        return `Produto: ${produto} | Total de Pedidos: ${numPedidos} | Valor total: R$${total.toFixed(2)} | Média por pedido: R$${(total / numPedidos).toFixed(2)}`;
    } else {
        return `Ainda não tivemos pedidos para o produto ${produto}`
    }


}

export default { createNewPedido, atualizaPedido, atualizaEntrega, apagarPedido, consultarPedido, totalCliente, totalProduto }