import { useNavigate } from "react-router-dom";

export const useRouter = () => {
  const router = useNavigate();

  return {
    currentPath: window.location,
    routeTo: (path: string) => router(path),
    routeBack: () => router(-1),
  };
};
