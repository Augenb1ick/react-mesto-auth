import RegSuccess from "../images/success.svg";
import RegError from "../images/error.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_infotooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <img
          className="popup__image"
          src={props.isRegSuccess ? RegSuccess : RegError}
          alt={props.isRegSuccess ? "Успешная картинка" : "Картинка с ошибкой"}
        />
        <h2 className="popup__heading popup__heading_infotooltip">
          {props.isRegSuccess
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
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

export default InfoTooltip;
