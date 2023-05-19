import usePopupClose from "../hooks/usePopupClose";

function DeleteCardPopup(props) {
  usePopupClose(props.isOpen, props.onClose);

  return (
    <div
      className={`popup popup_delete-content ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <form
          onSubmit={props.onSubmit}
          className="popup__content"
          name={props.name}
          noValidate
        >
          <h2 className="popup__heading">{"Вы уверены?"}</h2>
          <button className="popup__submit-btn" type="submit" name="submit">
            {!props.isRendering ? "Да" : "Удаляем..."}
          </button>
        </form>
        <button
          className="popup__close-btn"
          type="button"
          name="close"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
export default DeleteCardPopup;
