// class Item { 
//   public title: string
//   constructor(title: string) {
//     this.title = title;
//   }
// }
// diferenças.


class Item {
  constructor(public title: string) { }
}

class TodoList {
  private itens: Item[] = [];
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  addItem(item: Item) {
    this.itens.push(item)
  }

  removeItem(index: number) {
    this.itens.splice(index, 1);
  }

  getItems() {
    return this.itens
  }
}


const lista = new TodoList('arquivo.txt')
lista.addItem(new Item("ver ele"))
lista.addItem(new Item("desenhar"))
lista.removeItem(1)
lista.addItem(new Item("pintar"))
console.log(lista.getItems())