import ToDoItem from "../ToDoItem/ToDoItem";

function ToDoList(props) {
  const { todos, handleEdit, toggleComplete, handleDelete, addFileHandler } = props;

  return (
    <>
      <ul
        style={{
          height: "50%",
          width: "80%",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          margin: "3rem 0 0",
          padding: "0",
        }}
      >
        {todos.map((item) => {
          return (
            <ToDoItem
              key={item.id}
              todo={item}
              handleEdit={handleEdit}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              addFileHandler={addFileHandler}
            />
          );
        })}
      </ul>
    </>
  );
}

export default ToDoList;
