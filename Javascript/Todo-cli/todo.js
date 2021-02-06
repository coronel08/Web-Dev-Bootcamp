let todoPrompt = prompt("type new")
let todoList = ['Clean']

while (todoPrompt !== "quit") {
    if (todoPrompt === "list") {
        for (let i = 0; i < todoList.length; i++) {
            console.log(`Index: ${i} Todo: ${todoList[i]}`)
        } //break (to exit when list is done)
    } else if (todoPrompt === "new") {
        todoPrompt = prompt("Enter to do")
        todoList.push(todoPrompt)
    } else if (todoPrompt === "delete") {
        const indexTodo = parseInt(prompt("Enter Todo index to delete"))
        if (Number.isNaN(indexTodo)) {
            console.log("Enter a number")
        } const deleteTodo = todoList.splice(indexTodo, 1)
    } todoPrompt = prompt("new, list, delete, or quit commands")
} console.log("Quitting the App")