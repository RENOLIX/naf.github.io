import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-background px-4 text-center">
      <div>
        <p className="font-display text-7xl font-black text-primary">404</p>
        <h1 className="mt-2 text-2xl font-bold">Page introuvable</h1>
        <p className="mt-2 text-muted-foreground">Cette page n'existe pas ou a ete deplacee.</p>
        <Link to="/" className="mt-6 inline-flex rounded bg-primary px-5 py-3 font-bold text-white">Retour a l'accueil</Link>
      </div>
    </div>
  );
}
