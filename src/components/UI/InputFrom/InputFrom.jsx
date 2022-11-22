import "./InputFrom.css";
import { dataBase } from "../../../database/firebase";
import { collection, addDoc } from "firebase/firestore";

function InputFrom({ inputValue, setInputValue }) {
  /**
   * Получаем данные из инпутов
   * @param {Event} e event 
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTodo();
  }

  /**
   * Добавляем todo-элемент в коллекцию
   */
  async function addTodo() {
    if (inputValue !== "") {
      await addDoc(collection(dataBase, "todos"), {
        title: inputValue.title,
        subtitle: inputValue.description,
        finishDate: inputValue.date,
        completed: false,
        attachedFiles: [],
      });
      setInputValue({
        title: "",
        description: "",
        date: "",
      });
    }
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        className="input-form__todo-input"
        name="title"
        placeholder="Задача"
        value={inputValue.title}
        onInput={handleChange}
        required
      />
      <input
        className="input-form__todo-input"
        name="description"
        placeholder="Описание"
        value={inputValue.description}
        onInput={handleChange}
        required
      />
      <input
        className="input-form__todo-input"
        name="date"
        type="date"
        value={inputValue.date}
        onInput={handleChange}
        required
      />
      <button type="submit" className="input-form__todo-submit">
        Добавить
      </button>
    </form>
  );
}

export default InputFrom;
