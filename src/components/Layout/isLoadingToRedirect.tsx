import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const LoadingToRedirect = () => {
  const { t: translator } = useTranslation();
  const t = (t: string) => translator(`layout.${t}`);
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCount((contando) => contando - 1);
    }, 1000);

    count === 0 && navigate("/auth");

    return () => clearInterval(intervalo);
  }, [count, navigate]);

  const validation0Seconds = count === 0 ? "" : "seconds";
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-slate-600">
      <div className="h-fit w-fit rounded-6 bg-white p-6 text-2xl font-semibold text-secundaria-light">
        <p>{`Unauthenticated person, redirecting in ${count} ${
          count === 1 ? "second" : validation0Seconds
        }`}</p>
      </div>
    </div>
  );
};
