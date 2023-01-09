import React, { useState } from "react";
import "./modalPurchase.scss";
import Modal from "react-modal";
import { useDispatch, action, useSelector, RootState } from "store";
import { ButtonModalClose } from "components";
import logoVisa from "assets/Img/logoVisa.png";
import logoMasterCard from "assets/Img/logoMasterCard.png";
import logoMaestro from "assets/Img/logoMaestro.png";
import { useNavigate } from "react-router-dom";

const required = "This field is required";
const formatName = "Please input minimum 2 word";

const formatPhone = "Please use +888888888 format";
const formatEmail = "Please use example@mail.com format";
const formatAddress = "Please input minimum 3 word";
const formatCard = "Please input 16 digits";
const formatDate = "Please input month and year";
const formatCode = "Please input 3 digits";

const regexName = /^([a-zA-Z]{3,})+(?:\s[a-zA-Z]{3,}){1,}$/;
const regexPhone = /^[+][0-9]{9,}$/;
const regexAddress = /^([a-zA-Z]{5,})+(?:\s[a-zA-Z]{5,}){2,}$/;
const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;
const regexCard = /^[0-9]{16}$/;
const regexDate = /^[0-9]{2}(\/)[0-9]{2}$/;
const regexCode = /^[0-9]{3}$/;

const monthList = [
  "0",
  "1",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const yearList = ["2", "22", "23", "24", "25", "26", "27", "28", "29", "30"];

export const ModalPurchase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [date, setDate] = useState("");
  const [code, setCode] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cardError, setCardError] = useState("");
  const [dateError, setDateError] = useState("");
  const [codeError, setCodeError] = useState("");

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formIsClear = true;

    if (name === "") {
      setNameError(required);
      formIsClear = false;
    } else if (!regexName.test(name)) {
      setNameError(formatName);
      formIsClear = false;
    } else {
      setNameError("");
    }

    if (phone === "") {
      setPhoneError(required);
      formIsClear = false;
    } else if (!regexPhone.test(phone)) {
      setPhoneError(formatPhone);
      formIsClear = false;
    } else {
      setPhoneError("");
    }

    if (address === "") {
      setAddressError(required);
      formIsClear = false;
    } else if (!regexAddress.test(address)) {
      setAddressError(formatAddress);
      formIsClear = false;
    } else {
      setAddressError("");
    }

    if (email === "") {
      setEmailError(required);
      formIsClear = false;
    } else if (!regexEmail.test(email)) {
      setEmailError(formatEmail);
      formIsClear = false;
    } else {
      setEmailError("");
    }

    if (card === "") {
      setCardError(required);
      formIsClear = false;
    } else if (!regexCard.test(card)) {
      setCardError(formatCard);
      formIsClear = false;
    } else {
      setCardError("");
    }

    if (date === "") {
      setDateError(required);
      formIsClear = false;
    } else if (!regexDate.test(date)) {
      setDateError(formatDate);
      formIsClear = false;
    } else {
      setDateError("");
    }

    if (code === "") {
      setCodeError(required);
      formIsClear = false;
    } else if (!regexCode.test(code)) {
      setCodeError(formatCode);
      formIsClear = false;
    } else {
      setCodeError("");
    }

    if (formIsClear) {
      dispatch(action.showModalPurchase(false));
      dispatch(action.showModalInform(true));
      navigate("/");
    }
  };

  return (
    <Modal
      isOpen={useSelector((state: RootState) => state.modalPurchase)}
      portalClassName="modal__portal"
      overlayClassName="modal__overlay"
      className="modal__content"
      onRequestClose={() => {
        dispatch(action.showModalPurchase(false));
      }}
      contentLabel="Purchase Modal"
      ariaHideApp={false}
    >
      <div className="modal__body">
        <h2 className="modal__title">Personal details</h2>
        <ButtonModalClose
          onClick={() => {
            dispatch(action.showModalPurchase(false));
          }}
        />

        <form action="" className="form-purchase" onSubmit={submitHandler}>
          <label className="form-purchase__label">
            <span className="form-purchase__description">
              Enter your name surname
            </span>
            <input
              className="form-purchase__field"
              type="text"
              name="name"
              placeholder="Name Surname"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />
            {nameError && (
              <span className="form-purchase__error">{nameError}</span>
            )}
          </label>

          <div className="form-purchase__label">
            <span className="form-purchase__description">
              Enter your phone number
            </span>
            <input
              className="form-purchase__field"
              type="text"
              name="phone"
              placeholder="+155544425"
              value={phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const phoneValue = event.target.value;
                setPhone(phoneValue.replace(/[^0-9+]/g, ""));
              }}
            />
            {phoneError && (
              <span className="form-purchase__error">{phoneError}</span>
            )}
          </div>

          <div className="form-purchase__label">
            <span className="form-purchase__description">
              Enter your address
            </span>
            <input
              className="form-purchase__field"
              type="text"
              name="address"
              placeholder="Minsk prospekt Pushkina 26"
              value={address}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(event.target.value)
              }
            />
            {addressError && (
              <span className="form-purchase__error">{addressError}</span>
            )}
          </div>

          <div className="form-purchase__label">
            <span className="form-purchase__description">Enter your email</span>
            <input
              className="form-purchase__field"
              type="text"
              name="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
            />
            {emailError && (
              <span className="form-purchase__error">{emailError}</span>
            )}
          </div>

          <h3 className="form-purchase__subtitle">Credit card detail</h3>

          <div className="form-purchase__label">
            <span className="form-purchase__description">Card number</span>
            <div className="form-purchase__field-wrapper">
              <input
                className="form-purchase__field"
                type="text"
                name="card"
                placeholder="4000000000000000"
                value={card}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const cardValue = event.target.value;
                  setCard(cardValue.replace(/\D/g, ""));
                }}
                maxLength={16}
              />
              {card[0] === "4" && (
                <img
                  className="form-purchase__card-logo"
                  src={logoVisa}
                  alt=""
                />
              )}
              {card[0] === "5" && (
                <img
                  className="form-purchase__card-logo"
                  src={logoMasterCard}
                  alt=""
                />
              )}
              {card[0] === "6" && (
                <img
                  className="form-purchase__card-logo"
                  src={logoMaestro}
                  alt=""
                />
              )}
            </div>
            {cardError && (
              <span className="form-purchase__error">{cardError}</span>
            )}
          </div>

          <div className="form-purchase__label">
            <span className="form-purchase__description">Valid thru</span>
            <input
              className="form-purchase__field"
              type="text"
              name="date"
              placeholder="12/25"
              value={date}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                let dateValue = event.target.value;
                dateValue = dateValue.replace(/\D/g, "");
                if (dateValue.length === 0) {
                  setDate("");
                } else if (dateValue.length < 3) {
                  const month = `${dateValue.slice(0, 2)}`;
                  if (month && monthList.includes(month)) {
                    setDate(`${dateValue.slice(0, 2)}`);
                  }
                } else if (dateValue.length > 2) {
                  const year = `${dateValue.slice(2, 4)}`;
                  if (year && yearList.includes(year)) {
                    setDate(
                      `${dateValue.slice(0, 2)}/${dateValue.slice(2, 4)}`
                    );
                  }
                }
              }}
              maxLength={5}
            />
            {dateError && (
              <span className="form-purchase__error">{dateError}</span>
            )}
          </div>

          <div className="form-purchase__label">
            <span className="form-purchase__description">Code</span>
            <input
              className="form-purchase__field"
              type="text"
              name="code"
              placeholder="123"
              value={code}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const codeValue = event.target.value;
                setCode(codeValue.replace(/\D/g, ""));
              }}
              maxLength={3}
            />
            {codeError && (
              <span className="form-purchase__error">{codeError}</span>
            )}
          </div>

          <button className="primary-btn  form-purchase__confirm" type="submit">
            Confirm
          </button>
        </form>
      </div>
    </Modal>
  );
};
