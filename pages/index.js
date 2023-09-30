"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/today");
  }, []);
};

export default HomePage;
