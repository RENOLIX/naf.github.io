import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = window.setTimeout(() => navigate("/", { replace: true }), 600);
    return () => window.clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="grid h-svh place-items-center bg-background">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-secondary" />
        <p className="mt-4 text-sm text-muted-foreground">Chargement...</p>
      </div>
    </div>
  );
}
