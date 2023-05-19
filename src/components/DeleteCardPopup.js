import usePopupClose from "../hooks/usePopupClose";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  usePopupClose(props.isOpen, props.onClose);

  return (
    <PopupWithForm
      name="add-content"
      title="Вы уверены?"
      onSubmit={props.onSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isValid={true}
      buttonText={!props.isRendering ? "Да" : "Удаляем..."}
    />
  );
}
export default DeleteCardPopup;
