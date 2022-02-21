import type { NextPage } from "next";
import Head from "next/head";
import { PopUp } from "../components/PopUp";
import { SurveyCard } from "../components/SurveyCard";
import styles from "../styles/Home.module.css";
import { users } from "../data";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vendly</title>
        <meta name="description" content="Vendly assessment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PopUp users={users} />
        <SurveyCard title="Survey complete!" />
      </main>
    </div>
  );
};

export default Home;
