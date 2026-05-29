import { useState } from "react";
import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

type FormData = { nom: string; email: string; telephone: string; sujet: string; message: string };
const INIT: FormData = { nom: "", email: "", telephone: "", sujet: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<FormData>(INIT);
  const [sent, setSent] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoye ! Nous vous repondrons sous 24h.");
    setSent(true);
    setForm(INIT);
  };

  return (
    <div className="bg-background">
      <Hero />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <aside className="space-y-6">
            <div>
              <h2 className="mb-4 font-display text-2xl font-black text-foreground">INFORMATIONS DE CONTACT</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">Disponibles du dimanche au jeudi, de 8h a 17h pour vous accompagner dans tous vos projets.</p>
            </div>
            {[
              { icon: MapPin, label: "Adresse", value: "Zone Industrielle, Alger, Algerie" },
              { icon: Phone, label: "Telephone", value: "+213 (0) 555 000 000" },
              { icon: Mail, label: "Email", value: "contact@naf-factory.dz" },
              { icon: Clock, label: "Horaires", value: "Dim-Jeu : 8h00 - 17h00" },
            ].map((info) => (
              <div key={info.label} className="flex items-start gap-3">
                <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10"><info.icon className="h-5 w-5 text-primary" /></div>
                <div><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{info.label}</p><p className="mt-0.5 text-sm font-medium text-foreground">{info.value}</p></div>
              </div>
            ))}
            <div className="border-t border-border pt-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Support technique par marque</p>
              {[["Sika", "#D8282F", "sika@naf-factory.dz"], ["Terraco", "#008E62", "terraco@naf-factory.dz"], ["Lafarge", "#00925A", "lafarge@naf-factory.dz"]].map(([name, color, email]) => (
                <div key={name} className="mb-2 flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} /><span className="text-sm text-muted-foreground">{name}: {email}</span></div>
              ))}
            </div>
          </aside>

          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card py-16">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h3 className="font-display text-3xl font-black text-foreground">MESSAGE ENVOYE !</h3>
                <p className="max-w-sm text-center text-muted-foreground">Merci de nous avoir contacte. Notre equipe vous repondra dans les plus brefs delais.</p>
                <button onClick={() => setSent(false)} className="mt-2 text-sm font-semibold text-secondary hover:underline">Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-border bg-card p-8">
                <h3 className="font-display text-2xl font-black text-foreground">ENVOYER UN MESSAGE</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Nom complet *"><input name="nom" required value={form.nom} onChange={onChange} placeholder="Ahmed Benali" className="input" /></Field>
                  <Field label="Email *"><input type="email" name="email" required value={form.email} onChange={onChange} placeholder="example@gmail.com" className="input" /></Field>
                  <Field label="Telephone"><input type="tel" name="telephone" value={form.telephone} onChange={onChange} placeholder="+213 555 000 000" className="input" /></Field>
                  <Field label="Sujet *"><select name="sujet" required value={form.sujet} onChange={onChange} className="input"><option value="">Selectionner...</option><option value="devis">Demande de devis</option><option value="commande">Suivi de commande</option><option value="technique">Support technique</option><option value="partenariat">Partenariat commercial</option><option value="autre">Autre</option></select></Field>
                </div>
                <Field label="Message *"><textarea name="message" required value={form.message} onChange={onChange} rows={5} placeholder="Decrivez votre besoin ou votre projet..." className="input resize-none" /></Field>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded bg-secondary py-3 font-bold text-white transition-colors hover:bg-secondary/90"><Send className="h-4 w-4" /> Envoyer le Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`.input{width:100%;border:1px solid #dce4ee;border-radius:.375rem;background:#f8fafc;padding:.625rem .75rem;font-size:.875rem;outline:none}.input:focus{box-shadow:0 0 0 2px #2f66d855}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-foreground"><span className="mb-1 block">{label}</span>{children}</label>;
}

function Hero() {
  return (
    <div className="px-4 py-20" style={{ background: "linear-gradient(135deg, #18284b 60%, #2f66d8)" }}>
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white">Nous joindre</p>
        <h1 className="font-display text-5xl font-black text-white md:text-6xl">CONTACTEZ-NOUS</h1>
        <p className="mt-3 max-w-xl text-white">Notre equipe commerciale et technique est disponible pour repondre a toutes vos questions.</p>
      </div>
    </div>
  );
}
