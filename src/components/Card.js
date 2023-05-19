import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `content__like-button ${
    isLiked && "content__like-button_type_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="content__container">
      <img
        onClick={handleClick}
        className="content__image"
        alt={props.card.name}
        src={props.card.link}
      />
      <div className="content__text-container">
        <h2 className="content__text">{props.card.name}</h2>
        <div className="content__likes-container">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <p className="content__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          type="button"
          className="content__delete-button"
        />
      )}
    </div>
  );
}

export default Card;
