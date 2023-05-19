import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm(props) {
  usePopupClose(props.isOpen, props.onClose);

  return (
    <div
      className={`popup popup_${props.name} ${
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
          <h2 className="popup__heading">{props.title}</h2>
          {props.children}
          <button
            className={`popup__submit-btn ${
              !props.isValid ? "popup__submit-btn_disabled" : ""
            }`}
            type="submit"
            name="submit"
            disabled={!props.isValid}
          >
            {!props.isRendering ? "Сохранить" : "Сохраняем..."}
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

export default PopupWithForm;
