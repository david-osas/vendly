import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/PopUp.module.css";
import { PopUpType, User } from "../types";
import { AnimationItem } from "lottie-web";
import { generateAnimation } from "../utils/animation";

interface PopUpProps {
  users: User[];
  type: PopUpType;
  setHandle: (val: string) => void;
  setPopUp: (val: PopUpType) => void;
}

export const PopUp = (props: PopUpProps) => {
  const { users, type, setHandle, setPopUp } = props;
  const animationRef = useRef(null);

  function handleUser(handle: string) {
    setHandle(handle);
    setPopUp(PopUpType.EMPTY);
  }

  function getAnimationDetails(): { path: string; text: string } {
    if (type === PopUpType.LOADING) {
      return {
        path: "/assets/animations/loading.json",
        text: "Fetching Search Results",
      };
    } else if (type === PopUpType.ERROR) {
      return {
        path: "/assets/animations/error.json",
        text: "No results found",
      };
    } else {
      return { path: "", text: "" };
    }
  }

  useEffect(() => {
    let animation: AnimationItem | null = null;

    if (type === PopUpType.LOADING || type === PopUpType.ERROR) {
      animation = generateAnimation(
        animationRef,
        getAnimationDetails().path,
        1.8
      );
      if (animation) {
        animation.play();
      }
    }

    return () => {
      animation?.destroy();
    };
  }, [type]);

  return (
    <div className={styles.body}>
      {type === PopUpType.USERS ? (
        <div className={styles.userBox}>
          <div className={styles.controls}>
            <Image
              src="/assets/icons/CaretUp.svg"
              alt="control up"
              width={23.21}
              height={6.73}
            />
          </div>
          <div className={styles.userList}>
            {users.map((item, index) => (
              <div key={"user" + index}>
                <div
                  className={styles.userItem}
                  onClick={() => handleUser(item.handle)}
                >
                  <Image src={item.img} alt="profile" width={37} height={37} />
                  <div className={styles.userText}>
                    <p className={styles.username}>{item.username}</p>
                    <p className={styles.handle}>{item.handle}</p>
                  </div>
                </div>
                {index !== users.length - 1 && (
                  <hr className={styles.divider} />
                )}
              </div>
            ))}
          </div>
          <div className={styles.controls}>
            <Image
              src="/assets/icons/CaretDown.svg"
              alt="control down"
              width={23.21}
              height={6.73}
            />
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <div ref={animationRef} className={styles.loadingAnimation}></div>
          <p className={styles.loadingText}>{getAnimationDetails().text}</p>
        </div>
      )}
    </div>
  );
};
