import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
          <button
            onClick={props.onEditAvatar}
            className="profile__image-edit-btn"
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__info-heading">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__info-edit-button"
              type="button"
            ></button>
          </div>
          <p className="profile__info-subheading">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__info-add-button"
          type="button"
        ></button>
      </section>
      <section className="content">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={props.onCardLike}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
