import usePopupClose from "../hooks/usePopupClose";

function ImagePopup(props) {
  usePopupClose(props.card, props.onClose);
  return (
    <div
      className={`popup popup-photo ${props.card.link ? "popup_opened" : ""}`}
    >
      <div className="popup-photo__container">
        <img
          className="popup-photo__image"
          alt={props.card.name}
          src={props.card.link}
        />
        <p className="popup-photo__text">{props.card.name}</p>
        <button
          onClick={props.onClose}
          className="popup__close-btn"
          type="button"
          name="popup-photo-close-btn"
          id="popup-photo-close-btn"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
