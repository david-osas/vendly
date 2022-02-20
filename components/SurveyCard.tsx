import React from "react";
import Image from "next/image";
import styles from "../styles/SurveyCard.module.css";

interface SurveyCardProps {
  title: string;
}

export const SurveyCard = (props: SurveyCardProps) => {
  const { title } = props;

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
        />
      </div>

      <div className={styles.footer}>
        <button className={styles.button}>
          <p className={styles.buttonText}>Skip</p>
          <div className={styles.buttonIcon}>
            <Image
              src="/assets/icons/ContinueArrow.svg"
              alt="continue"
              width={6.96}
              height={11.81}
            />
          </div>
        </button>
        <p>
          <span className={styles.footerTextDark}>Read </span>
          <span className={styles.footerTextLight}>Instructions</span>
        </p>
      </div>
    </div>
  );
};
