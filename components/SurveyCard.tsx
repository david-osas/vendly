import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/SurveyCard.module.css";
import { users } from "../data";
import { PopUpType } from "../types";
import { generateAnimation } from "../utils/animation";
import { AnimationItem } from "lottie-web";

interface SurveyCardProps {
  title: string;
  setPopUp: (value: PopUpType) => void;
  selectedHandle: string;
  handleUser: (val: string) => void;
}

export const SurveyCard = (props: SurveyCardProps) => {
  const { title, setPopUp, selectedHandle, handleUser } = props;
  const [timeout, updateTimeout] = useState<NodeJS.Timeout | null>(null);
  const [textInput, setTextInput] = useState("");
  const [complete, setComplete] = useState({
    continue: false,
    validate: false,
    validText: false,
  });
  const continueRef = useRef(null);
  const validateRef = useRef(null);

  const continuePath = "/assets/animations/continue.json";
  const validatePath = "/assets/animations/validate.json";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (timeout) {
      clearTimeout(timeout);
    }

    setPopUp(PopUpType.LOADING);

    if (value.length > 0) {
      let isValid = false;

      for (let item of users) {
        if (item.handle.startsWith(value)) {
          setPopUp(PopUpType.USERS);
          isValid = true;
        }
      }

      if (!isValid) {
        const value = setTimeout(() => {
          setPopUp(PopUpType.ERROR);
        }, 2000);
        updateTimeout(value);
      }
    } else {
      setPopUp(PopUpType.EMPTY);
      handleUser("");
    }

    setTextInput(value);
  }

  function handleGoBack() {
    setTextInput("");
    setPopUp(PopUpType.EMPTY);
  }

  function handleButtonClass() {
    if (complete.validate) {
      return styles.buttonValidate;
    } else if (complete.validText) {
      return styles.buttonDark;
    }

    return "";
  }

  function handleButtonClick() {
    let isValid = false;

    for (let item of users) {
      if (item.handle === textInput) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      setComplete({ ...complete, continue: true });

      setTimeout(() => {
        setComplete({ ...complete, continue: false, validate: true });
        setPopUp(PopUpType.EMPTY);
      }, 2000);
    }
  }

  useEffect(() => {
    let isValid = false;

    for (let item of users) {
      if (item.handle === textInput) {
        isValid = true;
        break;
      }
    }

    setComplete({ ...complete, validText: isValid });
  }, [textInput]);

  useEffect(() => {
    if (selectedHandle.length > 0) {
      setTextInput(selectedHandle);
      handleUser("");
    }
  }, [selectedHandle]);

  useEffect(() => {
    let animation: AnimationItem | null = null;
    if (complete.continue) {
      animation = generateAnimation(continueRef, continuePath, 1.8);
    }

    return () => {
      animation?.destroy();
    };
  }, [complete.continue]);

  useEffect(() => {
    let animation: AnimationItem | null = null;
    if (complete.validate) {
      animation = generateAnimation(validateRef, validatePath, 1.8);
    }

    return () => {
      animation?.destroy();
    };
  }, [complete.validate]);

  return (
    <div className={styles.card}>
      {!complete.validate && (
        <header className={styles.header}>
          <p>{title}</p>
        </header>
      )}

      <div className={styles.body}>
        {complete.validate ? (
          <>
            <div ref={validateRef} className={styles.validateAnimation}></div>
            <div className={styles.validateNumberBox}>
              <Image
                src="/assets/icons/Naira.svg"
                alt="naira"
                width={13.82}
                height={14.51}
              />
              <p className={styles.validateNumber}>2,000.00</p>
            </div>
            <p className={styles.validateTitle}>Please wait.</p>
            <p className={styles.validateText}>
              Validating user credentials....
            </p>
          </>
        ) : (
          <>
            <Image
              src="/assets/icons/Flag.svg"
              alt="green flag"
              width={289}
              height={161}
            />
            <p className={styles.bodyTitle}>Pass it on?</p>
            <p className={styles.bodyText}>
              Nominate someone else to take this incentivized survey.
            </p>
            <input
              placeholder="Search/ Insert their Twitter handle"
              type={"text"}
              className={styles.textInput}
              value={textInput}
              onChange={handleChange}
            />
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <button
          className={`${styles.button} ${handleButtonClass()}`}
          disabled={!complete.validText || complete.validate}
          onClick={handleButtonClick}
        >
          {complete.validate ? (
            <Image
              src="/assets/icons/Validate.svg"
              alt="validating"
              width={47}
              height={8}
              className={styles.buttonValidateImg}
            />
          ) : complete.continue ? (
            <div ref={continueRef} className={styles.continueAnimation}></div>
          ) : (
            <>
              <p
                className={`${styles.buttonText} ${
                  textInput.length > 0 && styles.buttonTextLight
                }`}
              >
                {complete.validText ? "Continue" : "Skip"}
              </p>

              <div className={styles.buttonIcon}>
                <Image
                  src={`/assets/icons/${
                    textInput.length > 0
                      ? "ContinueArrowLight"
                      : "ContinueArrowDark"
                  }.svg`}
                  alt="continue"
                  width={6.96}
                  height={11.81}
                />
              </div>
            </>
          )}
        </button>
        {!complete.validate &&
          (textInput.length == 0 ? (
            <p>
              <span className={styles.footerTextDark}>Read </span>
              <span className={styles.footerTextLight}>Instructions</span>
            </p>
          ) : (
            <div className={styles.goBackBox}>
              <Image
                src="/assets/icons/ArrowLeft.svg"
                alt="left"
                width={16}
                height={11}
              />
              <span className={styles.goBackText} onClick={handleGoBack}>
                Go Back
              </span>
            </div>
          ))}
      </footer>
    </div>
  );
};
