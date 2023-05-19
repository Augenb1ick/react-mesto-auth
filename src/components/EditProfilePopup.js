import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";

function EditProfilePopup(props) {
  const {
    setValue,
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const currentUser = useContext(CurrentUserContext);

  const onSubmit = (data) => {
    props.onUpdateUser({ name: data.name, about: data.description });
  };

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("description", currentUser.about);

    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit(onSubmit)}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isRendering={props.isRendering}
      isValid={isValid}
    >
      <input
        {...register("name", {
          required: "Это поле нужно заполнить",
          minLength: {
            value: 2,
            message: "Название должно состоять как минимум из 2 символов",
          },
          maxLength: {
            value: 30,
            message: "Название должно состоять не больше чем из 40 символов",
          },
        })}
        type="text"
        className="popup__text"
        name="name"
        id="name"
        placeholder="Имя"
      />
      <span className="popup__text-error editName-error">
        {errors?.name?.message}
      </span>
      <input
        {...register("description", {
          required: "Это поле нужно заполнить",
          minLength: {
            value: 2,
            message: "Название должно состоять как минимум из 2 символов",
          },
          maxLength: {
            value: 400,
            message: "Название должно состоять не больше чем из 400 символов",
          },
        })}
        type="text"
        className="popup__text"
        name="description"
        id="description"
        placeholder="О себе"
      />
      <span className="popup__text-error editInfoOrLink-error">
        {errors?.description?.message}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
