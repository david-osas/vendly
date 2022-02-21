import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { PopUp } from "../components/PopUp";
import { SurveyCard } from "../components/SurveyCard";
import styles from "../styles/Home.module.css";
import { users } from "../data";
import { PopUpType } from "../types";

const Home: NextPage = () => {
  let [popup, setPopUp] = useState<PopUpType>(PopUpType.EMPTY);
  let [handle, setHandle] = useState("");

  function handlePopUp(state: PopUpType) {
    setPopUp(state);
  }

  function handleUser(handle: string) {
    setHandle(handle);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Vendly</title>
        <meta name="description" content="Vendly assessment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {popup !== PopUpType.EMPTY ? (
          <PopUp
            users={users}
            type={popup}
            setHandle={handleUser}
            setPopUp={handlePopUp}
          />
        ) : null}
        <SurveyCard
          title="Survey complete!"
          setPopUp={handlePopUp}
          selectedHandle={handle}
          handleUser={handleUser}
        />
      </main>
    </div>
  );
};

export default Home;
