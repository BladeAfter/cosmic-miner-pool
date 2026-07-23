import { useEffect, useState } from "react";
import "./LoadingScreen.css";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const loadingSteps = [
  { progress: 10, message: "Inicializando núcleo..." },
  { progress: 25, message: "Conectando Telegram..." },
  { progress: 45, message: "Carregando recursos..." },
  { progress: 65, message: "Sincronizando jogador..." },
  { progress: 85, message: "Preparando universo..." },
  { progress: 100, message: "Bem-vindo Comandante!" },
];

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(loadingSteps[0].message);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {

    let index = 0;

    const timer = setInterval(() => {

      if (index >= loadingSteps.length) {

        clearInterval(timer);

        setFadeOut(true);

        setTimeout(() => {
          onComplete?.();
        }, 600);

        return;
      }

      setProgress(loadingSteps[index].progress);
      setMessage(loadingSteps[index].message);

      index++;

    }, 800);

    return () => clearInterval(timer);

  }, [onComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>

      <div className="loading-content">

        <div className="progress-wrapper">

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="progress-percent">
            {progress}%
          </div>

        </div>

        <div className="loading-message">
          {message}
        </div>

      </div>

    </div>
  );
}