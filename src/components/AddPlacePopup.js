import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function AddPlacePopup(props) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  const onSubmit = (data) => {
    props.onAddPlace({
      name: data.placeName,
      link: data.placeLink,
    });
  };

  return (
    <PopupWithForm
      name="add-content"
      title="Новое место"
      onSubmit={handleSubmit(onSubmit)}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isRendering={props.isRendering}
      isValid={isValid}
    >
      <input
        {...register("placeName", {
          required: "Это поле нужно заполнить",
          minLength: {
            value: 2,
            message: "Название должно состоять как минимум из 2 символов",
          },
          maxLength: {
            value: 30,
            message: "Название должно состоять не больше чем из 30 символов",
          },
        })}
        type="text"
        className="popup__text"
        name="placeName"
        id="editName"
        placeholder="Название"
      />
      <span className="popup__text-error editName-error">
        {errors?.placeName?.message}
      </span>
      <input
        {...register("placeLink", {
          required: { value: true, message: "Это поле нужно заполнить" },
          pattern: {
            value:
              /(http(s):\/\/.)[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/,
            message: "Пожалуйста, введите правильную ссылку",
          },
        })}
        className="popup__text"
        name="placeLink"
        id="editInfoOrLink"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__text-error editInfoOrLink-error">
        {errors?.placeLink?.message}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
