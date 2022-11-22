import InputFrom from "../UI/InputFrom/InputFrom";
import ToDoList from "../UI/ToDoList/ToDoList";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { dataBase, storage } from "../../database/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    date: "",
  });

  /**
   * Получаем все коллекции из Firebase и складываем и помещаем их в стейт todos
   */
  useEffect(() => {
    const queryToDatabase = query(collection(dataBase, "todos"));
    const unsubscribe = onSnapshot(queryToDatabase, (querySnapshot) => {
      let todosArray = [];

      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, []);

  /**
   * Обновляем поля todo-элемента 
   * @param {object} todo объект, в котром находятся все поля todo-элемента
   * @param {string} title новый заголовок todo-элемента
   * @param {string} description новое описание todo-элемента
   * @param {string} date новая конечная дата todo-элемента
   */
  function handleEdit(todo, title, description, date) {
    updateDoc(doc(dataBase, "todos", todo.id), {
      title: title,
      subtitle: description,
      finishDate: date,
    });
  }

  /**
   * Меняем стейт, выполнено или нет
   * @param {object} todo объект, в котром находятся все поля todo-элемента
   */
  function toggleComplete(todo) {
    updateDoc(doc(dataBase, "todos", todo.id), { completed: !todo.completed });
  }

  /**
   * Удаляем todo-элемент
   * @param {string} id id todo-элементa
   */
  function handleDelete(id) {
    deleteDoc(doc(dataBase, "todos", id));
  }

  /**
   * Получаем файл из event, передаём функции uploadFiles
   * @param {Event} e event
   * @param {object} todo объект, в котром находятся все поля todo-элемента
   */
  function addFileHandler(e, todo) {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file, todo);
  }

  /**
   * Загружаем файл в БД, передаём его ссылку и название в функцию handleAddLink
   * @param {File} file файл, полученный из event
   * @param {object} todo объект, в котром находятся все поля todo-элемента
   * @returns 
   */
  function uploadFiles(file, todo) {
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    uploadBytes(sotrageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleAddLink(todo, url, file.name);
      });
    });
  }

  /**
   * Записываем в БД добавленный файл
   * @param {object} todo объект, в котром находятся все поля todo-элемента
   * @param {string} url ссылка на файл
   * @param {string} name имя файла
   */
  function handleAddLink(todo, url, name) {
    updateDoc(doc(dataBase, "todos", todo.id), {
      attachedFiles: arrayUnion({ name: name, url: url }),
    });
  }

  return (
    <div
      style={{
        maxWidth: "1024px",
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <InputFrom inputValue={inputValue} setInputValue={setInputValue} />
      <ToDoList
        todos={todos}
        handleEdit={handleEdit}
        toggleComplete={toggleComplete}
        handleDelete={handleDelete}
        addFileHandler={addFileHandler}
      />
    </div>
  );
}

export default App;
