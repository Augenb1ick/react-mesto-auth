import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import ProtectedRouteElement from "./ProtectedRoute";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { api } from "../utills/api";
import * as auth from "../utills/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cardToBeDeleted, setCardToBeDeleted] = useState({});
  const [cards, setCards] = useState([]);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegSuccess, setIsRegSuccess] = useState(false);

  const navigate = useNavigate();

  function handleChangeRenderingStatus(isRendering) {
    setIsRendering(isRendering);
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleClickCardDelete(card) {
    setIsDeleteCardPopupOpen(true);
    setCardToBeDeleted(card);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api
      .deleteCard(cardToBeDeleted._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== cardToBeDeleted._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateUser(userData) {
    handleChangeRenderingStatus(true);
    api
      .editProfileInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        handleChangeRenderingStatus(false);
      });
  }

  function handleUpdateAvatar(avatarData) {
    handleChangeRenderingStatus(true);
    api
      .editAvatar(avatarData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        handleChangeRenderingStatus(false);
      });
  }

  function handleAddPlaceSubmit(placeData) {
    handleChangeRenderingStatus(true);
    api
      .postCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        handleChangeRenderingStatus(false);
      });
  }

  function handleLoginSubmit(data) {
    auth.authorize(data.password, data.email).then((res) => {
      if (res) {
        localStorage.setItem("jwt", res.token);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      }
    });
  }

  function handleRegistrationSubmit(data) {
    auth
      .register(data.password, data.email)
      .then((res) => {
        if (res) {
          setIsRegSuccess(true);
          setIsInfoTooltipOpen(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
    setUserEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header userEmail={userEmail} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                isLoggedIn={isLoggedIn}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardLike={handleCardLike}
                onCardDelete={handleClickCardDelete}
                setCards={setCards}
                cards={cards}
              />
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route
            path="/sign-in"
            element={<Login onSubmit={handleLoginSubmit} />}
          />
          <Route
            path="/sign-up"
            element={<Register onSubmit={handleRegistrationSubmit} />}
          />
        </Routes>
        <Footer />
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isRegSuccess={isRegSuccess}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isRendering={isRendering}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isRendering={isRendering}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isRendering={isRendering}
      />
      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        isRendering={isRendering}
        onSubmit={handleCardDelete}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
