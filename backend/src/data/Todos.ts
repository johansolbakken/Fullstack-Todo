export type Todo = {
    id: number,
    text: string,
    checked: boolean
}

export let todos: Todo[] = [
    { id: 1, text: "Hello", checked: false }
];

export const deleteTodo = (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    todos = todos.filter(todo => todo.id !== id);
    return todo;
}