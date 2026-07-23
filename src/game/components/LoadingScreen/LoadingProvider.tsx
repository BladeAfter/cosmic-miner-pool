import { useState, type ReactNode } from "react";
import LoadingScreen from "./LoadingScreen";

interface LoadingProviderProps {
  children: ReactNode;
}

export default function LoadingProvider({
  children,
}: LoadingProviderProps) {
  const [loading, setLoading] = useState(true);

  const handleComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleComplete} />;
  }

  return <>{children}</>;
}