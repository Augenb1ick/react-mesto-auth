import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function EditAvatarPopup(props) {
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  const onSubmit = (data) => {
    props.onUpdateAvatar({ avatar: data.avatar });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить Аватар"
      onSubmit={handleSubmit(onSubmit)}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isRendering={props.isRendering}
      isValid={isValid}
    >
      <input
        {...register("avatar", {
          required: { value: true, message: "Это поле нужно заполнить" },
          pattern: {
            value:
              /(http(s):\/\/.)[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/,
            message: "Пожалуйста, введите правильную ссылку",
          },
        })}
        className="popup__text popup__text_type_link"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__text-error editAvatar-error">
        {errors?.avatar?.message}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
