import { useLocation, useNavigate, useParams as useParamsRR, useSearchParams as useSearchParamsRR } from "react-router-dom";

type Router = {
  push: (to: string) => void;
  replace: (to: string) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: (_to: string) => void;
};

export function useRouter(): Router {
  const navigate = useNavigate();
  return {
    push: (to) => navigate(to),
    replace: (to) => navigate(to, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => {
      window.location.reload();
    },
    prefetch: () => {},
  };
}

export function usePathname(): string {
  const location = useLocation();
  return location.pathname;
}

export function useSearchParams(): URLSearchParams {
  const [params] = useSearchParamsRR();
  return params;
}

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>(): T {
  return useParamsRR() as T;
}

export function redirect(to: string): never {
  if (typeof window !== "undefined") {
    window.location.replace(to);
  }
  throw new Error("NEXT_REDIRECT");
}
