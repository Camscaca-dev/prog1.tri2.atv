// CLI: Command Line Interface
//possibilidades de import:
// import TodoListClass from "./core"
// import { Item, TodoList } from "./core"
// import { Item as Item1, TodoList as TodoList1 } from "./core"

import TodoListClass, { Item } from "./core"

const todolist = new TodoListClass("todolist.json")
const params = process.argv
const command = params[2]

// ------------------------------------------------------------------------------
// --- Comando List
// ------------------------------------------------------------------------------

if (command === "list") {
    const items = await todolist.getItems()
    console.log("Lista de itens:")
    items.forEach((item, index) => {
        console.log(`${index}: ${item.title}`)
    })

    process.exit(0)
}

// ------------------------------------------------------------------------------
// --- Comando Add
// ------------------------------------------------------------------------------

if (command === "add") {
    const value = params[3]

    if (!value) {
        console.error("Valor do item é obrigatório")
        process.exit(1)
    }

    try {
        await todolist.addItem(new Item(value))
    } catch (error) {
        console.error("Erro ao adicionar item:", error)
        process.exit(1)
    }

    console.log(`Item "${value}" adicionado com sucesso!`)
    process.exit(0)
}

// ------------------------------------------------------------------------------
// --- Comando Remove
// ------------------------------------------------------------------------------

if (command === "remove") {
    const indexStr = params[3]
    if (!indexStr) {
        console.error("Índice do item é obrigatório")
        process.exit(1)
    }
    const index = parseInt(indexStr)
    if (isNaN(index)) {
        console.error("Índice inválido, precisa ser um número inteiro")
        process.exit(1)
    }
    await todolist.removeItem(index)
    console.log(`Item no índice ${index} removido com sucesso!`)
    process.exit(0)
}

// ------------------------------------------------------------------------------
// --- Atualizar item
// ------------------------------------------------------------------------------

if (command === "update") {
    const index = parseInt(params[3]!)
    const newTitle = params[4]
    if (isNaN(index) || !newTitle) {
        console.error("Uso: update <indice> <novo titulo>")
        process.exit(1)
    }
    console.log("Item atualizado!")
    process.exit(0)
}

// ------------------------------------------------------------------------------
// --- Fallback para comandos não reconhecidos
// ------------------------------------------------------------------------------

if (command)
    console.log(`Comando não reconhecido: ${command}`)

console.log(`Comandos disponíveis:
- add <item>: Adiciona um item à lista
- remove <index>: Remove um item da lista por indice
- list: Lista os itens atuais
- update <index> <new title>: Atualiza o título de um item por indice
`)
