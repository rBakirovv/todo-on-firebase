import "./ToDoItem.css";
import dayjs from "dayjs";
import ChangePopup from "../ChangePopup/ChangePopup";
import { useState } from "react";
require("dayjs/locale/ru");

function ToDoItem(props) {
  const { todo, handleEdit, toggleComplete, handleDelete, addFileHandler } =
    props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /** Дедлайн */
  const dateFinish = dayjs(todo.finishDate);
  /** Текущая дата */
  const dateNow = dayjs();
  /** Сравнение, наступил ли дедлайн */
  const dateRange = dateFinish.diff(dateNow);

  /**
   * Открываем модальное окно для редактирования todo-элемента
   */
  function openPopup() {
    setIsPopupOpen(true);
  }

  /**
   * Закрываем модальное окно для редактирования todo-элемента
   */
  function closePopup() {
    setIsPopupOpen(false);
  }

  return (
    <li
      className={`todo-item ${todo.completed && "todo-item_active"} ${
        dateRange < 0 && "todo-item_overdue"
      }`}
    >
      <div className="todo-item__container">
        <h2 className="todo-item__title">{todo.title}</h2>
        <div className="todo-item__buttons-container">
          <button
            className="todo-item__button"
            onClick={() => toggleComplete(todo)}
          >
            {todo.completed ? "Не выполн." : "Выполн."}
          </button>
          <button className="todo-item__button" onClick={openPopup}>
            Изм.
          </button>
          <button
            className="todo-item__button"
            onClick={() => handleDelete(todo.id)}
          >
            Удалить
          </button>
        </div>
      </div>
      <p className="todo-item__description">{todo.subtitle}</p>
      <p className="todo-item__date">
        Закончить до{" "}
        <span className="todo-item__date-span">
          {dayjs(todo.finishDate).locale("ru").format("DD MMM YYYY")}
        </span>
      </p>
      <form
        className="todo-item__add-files"
        onSubmit={(e) => {
          addFileHandler(e, todo);
        }}
      >
        <input type="file" />
        <button className="todo-item__button">Доб. файл</button>
      </form>
      {todo.attachedFiles.length > 0 && (
        <div className="todo-item__files">
          Прикреплённые файлы:
          {todo.attachedFiles.map((item, key) => {
            return (
              <a key={key} href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            );
          })}
        </div>
      )}
      <ChangePopup
        todo={todo}
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        handleEdit={handleEdit}
      />
    </li>
  );
}

export default ToDoItem;
