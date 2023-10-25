export async function addTodo(id: number, title: string, status: string) {
  const todos = [];
  const todo   = {
        id    : id,
        title : title,
        status: status,
    }
  todos.push(todo);
  let result = todos.map((todo) => {
      return todo.title;
  })
  console.log(result);
}