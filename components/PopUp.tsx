import Image from "next/image";
import React from "react";
import styles from "../styles/PopUp.module.css";
import { PopUpType, User } from "../types";

interface PopUpProps {
  users: User[];
  type: PopUpType;
  setHandle: (val: string) => void;
}

export const PopUp = (props: PopUpProps) => {
  const { users, type, setHandle } = props;

  function handleUser(handle: string) {
    setHandle(handle);
  }

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
      ) : null}
      {/* <div className={styles.loading}>
        <p className={styles.loadingText}>Fetching Search Results</p>
      </div> */}
    </div>
  );
};
