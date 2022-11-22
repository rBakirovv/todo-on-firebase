import { useState } from "react";
import "./ChangePopup.css";

function ChangePopup(props) {
  const { todo, isPopupOpen, closePopup, handleEdit } = props;

  const [inputValue, setInputValue] = useState({
    title: todo.title,
    description: todo.subtitle,
    date: todo.finishDate,
  });

  /**
   * Записываем данные из инпутов
   * @param {Event} e event
   */
  function handleChange(e) {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }

  /**
   * Передаём новые изменённые данные в БД, закрываем модальное окно
   * @param {Event} e event 
   */
  function onSubmit(e) {
    e.preventDefault();
    handleEdit(todo, inputValue.title, inputValue.description, inputValue.date);
    closePopup();
  }

  return (
    <div className={`change-popup ${isPopupOpen && "change-popup_active"}`}>
      <form className="change-popup__container" onSubmit={onSubmit}>
        <input
          className="change-popup__todo-input"
          name="title"
          placeholder="Задача"
          value={inputValue.title}
          onInput={handleChange}
          required
        />
        <input
          className="change-popup__todo-input"
          name="description"
          placeholder="Описание"
          value={inputValue.description}
          onInput={handleChange}
          required
        />
        <input
          className="change-popup__todo-input"
          name="date"
          type="date"
          value={inputValue.date}
          onInput={handleChange}
          required
        />
        <button className="change-popup__button" onClick={closePopup}>
          Закрыть
        </button>
        <button type="submit" className="change-popup__button">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default ChangePopup;
