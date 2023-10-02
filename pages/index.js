"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";

const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/today");
  }, [router]);

  return <div className={styles.load}>Loading...</div>;
};

export default HomePage;
