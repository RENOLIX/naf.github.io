import { Link } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, MessageSquare, Minus, Package, Phone, Plus, ShoppingCart, Trash2, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCart } from "@/hooks/use-cart.ts";

const orderSchema = z.object({
  nom: z.string().min(2, "Le nom est obligatoire"),
  prenom: z.string().min(2, "Le prenom est obligatoire"),
  adresse: z.string().min(5, "L'adresse est obligatoire"),
  telephone1: z.string().min(8, "Le numero principal est obligatoire"),
  telephone2: z.string().optional(),
  societe: z.string().optional(),
  message: z.string().optional(),
});

type OrderForm = z.infer<typeof orderSchema>;

export default function Panier() {
  const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<OrderForm>({ resolver: zodResolver(orderSchema) });

  const onSubmit = () => {
    toast.success("Demande envoyee ! Notre equipe vous contactera sous 24h.");
    clearCart();
    reset();
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4">
        <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-muted"><ShoppingCart className="h-10 w-10 text-muted-foreground" /></div>
        <h2 className="mb-2 font-display text-3xl font-black text-foreground">VOTRE PANIER EST VIDE</h2>
        <p className="mb-8 text-center text-muted-foreground">Parcourez notre catalogue pour trouver les produits dont vous avez besoin.</p>
        <Link to="/produits" className="flex items-center gap-2 rounded bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary/90"><ArrowLeft className="h-4 w-4" /> Voir le Catalogue</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/70">Mon Espace</p>
          <h1 className="font-display text-5xl font-black text-white">MON PANIER</h1>
          <p className="mt-1 text-white/70">{totalItems()} article{totalItems() !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Link to="/produits" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Continuer les achats</Link>
                  <button type="button" onClick={clearCart} className="text-xs text-destructive hover:text-destructive/80">Vider le panier</button>
                </div>
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                    <img src={item.product.image} alt={item.product.name} className="h-20 w-20 shrink-0 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.product.brand} - {item.product.category}</p>
                          <p className="truncate font-bold text-foreground">{item.product.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">Unite: {item.product.unit}</p>
                        </div>
                        <button type="button" onClick={() => removeItem(item.product.id)} className="shrink-0 text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div className="mt-3 flex items-center">
                        <div className="flex items-center gap-2 rounded-md border border-border">
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="grid h-8 w-8 place-items-center transition-colors hover:bg-muted"><Minus className="h-3 w-3" /></button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="grid h-8 w-8 place-items-center transition-colors hover:bg-muted"><Plus className="h-3 w-3" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-1 font-display text-xl font-black">VOS COORDONNEES</h3>
                <p className="mb-6 text-sm text-muted-foreground">Remplissez le formulaire ci-dessous pour finaliser votre demande de devis.</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormInput icon={User} label="Nom" error={errors.nom?.message} required><input {...register("nom")} placeholder="Votre nom" className="field" /></FormInput>
                  <FormInput icon={User} label="Prenom" error={errors.prenom?.message} required><input {...register("prenom")} placeholder="Votre prenom" className="field" /></FormInput>
                  <FormInput icon={Phone} label="Telephone principal" error={errors.telephone1?.message} required><input {...register("telephone1")} placeholder="06 12 34 56 78" className="field" /></FormInput>
                  <FormInput icon={Phone} label="Telephone secondaire"><input {...register("telephone2")} placeholder="05 12 34 56 78" className="field" /></FormInput>
                  <FormInput icon={MapPin} label="Adresse" error={errors.adresse?.message} required wide><input {...register("adresse")} placeholder="N rue, quartier, wilaya..." className="field" /></FormInput>
                  <FormInput icon={Building2} label="Nom de societe" wide><input {...register("societe")} placeholder="Votre entreprise ou societe" className="field" /></FormInput>
                  <FormInput icon={MessageSquare} label="Message personnalise" wide><textarea {...register("message")} rows={4} placeholder="Precisions sur votre commande..." className="field resize-none" /></FormInput>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-xl font-black">RESUME DE LA COMMANDE</h3>
                <div className="mb-4 space-y-2">
                  {items.map((item) => <div key={item.product.id} className="flex justify-between text-sm"><span className="mr-2 truncate text-muted-foreground">{item.product.name} x {item.quantity}</span></div>)}
                </div>
                <div className="mb-6 border-t border-border pt-4"><p className="text-xs text-muted-foreground">* Prix sur devis - contactez-nous pour un tarif personnalise.</p></div>
                <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded bg-secondary py-3 font-bold text-white transition-colors hover:bg-secondary/90 disabled:opacity-60"><Package className="h-4 w-4" /> Envoyer la Demande</button>
                <p className="mt-3 text-center text-xs text-muted-foreground">Notre equipe commerciale vous recontactera sous 24h.</p>
              </div>
            </aside>
          </div>
        </form>
      </div>
      <style>{`.field{width:100%;border:1px solid #dce4ee;border-radius:.375rem;background:#f8fafc;padding:.625rem .75rem;font-size:.875rem;outline:none}.field:focus{box-shadow:0 0 0 2px #2f66d855}`}</style>
    </div>
  );
}

function FormInput({ icon: Icon, label, children, error, required, wide }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode; error?: string; required?: boolean; wide?: boolean }) {
  return (
    <label className={wide ? "sm:col-span-2" : ""}>
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground"><Icon className="h-3.5 w-3.5" /> {label} {required && <span className="text-destructive">*</span>}</span>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </label>
  );
}
