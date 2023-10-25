import { type MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo-App" },
    { name: "description", content: "Todo-App" },
  ];
};

// function* generatorId() {
//   let id = 1;
//   while (true) {
//     yield id++;
//   }
// }
// const getId = generatorId();

export default function Index() {
  const [todos, setTodos] = useState(() => {
    if (typeof window !== 'undefined') {
      const getTodos = localStorage.getItem("todos");
      if (getTodos) {
        return JSON.parse(getTodos);
      } else {
        return [];
      }
    }
  });
  const [todo, setTodo]   = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    
  },[todos]);

  function handleInputChange(e: any) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo,
          completed: false,
        }
      ])
    }
    setTodo("");
  }

  function taskCompleted(id) {
    // console.log(todos[id]);
    const updateTodo = todos?.map((todo) => {
      if (id === todo.id) {
        return {...todo, completed: !todo.completed}
      }
      return todo;
    })
    setTodos(updateTodo);
  }

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <Form onSubmit={handleFormSubmit}>
              <div className="flex mt-4">
                  <input type="text" name="todo" value={todo} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                  <button type="submit" disabled={todo.length === 0} className="flex-no-shrink p-2 border-2 rounded text-teal border-tealhover:bg-teal">Add</button>
              </div>
            </Form>
        </div>
        <div>
          <ul>
            <div className=" mb-4 items-center">
                  {todos?.map((todo: any) => (
                    
                      <li className="w-full text-grey-darkes" key={todo.id}>{todo.text}
                        <input id={todo.id} type="checkbox" defaultChecked={todo.completed} onChange={() => taskCompleted(todo.id)}/>
                        {/* <button type="button" onChange={() => taskCompleted(todo.id)} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-green border-green hover:bg-green">Done</button> */}
                        <button type="button" onChange={() => console.log("hello world")} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:bg-red">Remove</button>
                      </li>
                      
                ))}
                
            </div>  
          </ul>  
        </div>
    </div>
</div>
  );
}
