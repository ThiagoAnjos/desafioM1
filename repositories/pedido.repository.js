import { promises as fs, read } from "fs";

const { readFile, writeFile } = fs;

async function getFile() {
    const data = JSON.parse(await readFile('pedidos.json'));
    return data;
}

async function createFile(data) {
    await writeFile('pedidos.json', JSON.stringify(data, null, 2))
    return;
}

async function getPedidos() {
    const data = await getFile();
    return data.pedidos;
}

async function createPedido(data) {
    await createFile(data)
    return;
}

async function updatePedido(data) {
    await createFile(data);
    return;
}

export default { getPedidos, createPedido, updatePedido, getFile, createFile }