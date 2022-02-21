import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/SurveyCard.module.css";
import { users } from "../data";
import { PopUpType } from "../types";

interface SurveyCardProps {
  title: string;
  setPopUp: (value: PopUpType) => void;
  selectedHandle: string;
  handleUser: (val: string) => void;
}

export const SurveyCard = (props: SurveyCardProps) => {
  const { title, setPopUp, selectedHandle, handleUser } = props;
  const [textInput, setTextInput] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value.length > 0) {
      for (let item of users) {
        if (item.handle.startsWith(value)) {
          setPopUp(PopUpType.USERS);
        }
      }
    }

    setTextInput(value);
  }

  function handleGoBack() {
    setTextInput("");
  }

  useEffect(() => {
    if (selectedHandle.length > 0) {
      setTextInput(selectedHandle);
      setPopUp(PopUpType.EMPTY);
    }
  }, [selectedHandle]);

  useEffect(() => {
    if (textInput === "") {
      setPopUp(PopUpType.EMPTY);
      handleUser("");
    }
  }, [textInput]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p>{title}</p>
      </div>

      <div className={styles.body}>
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
      </div>

      <div className={styles.footer}>
        <button
          className={`${styles.button} ${
            selectedHandle.length > 0 && styles.buttonDark
          }`}
          disabled={textInput.length > 0 && selectedHandle.length === 0}
        >
          <p
            className={`${styles.buttonText} ${
              textInput.length > 0 && styles.buttonTextLight
            }`}
          >
            {selectedHandle.length > 0 ? "Continue" : "Skip"}
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
        </button>
        {textInput.length == 0 ? (
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
        )}
      </div>
    </div>
  );
};
