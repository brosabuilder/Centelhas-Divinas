import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const SUBSCRIBED_KEY = "centelhas-subscribed";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return;
    setLoading(true);
    try {
      // supabase is always available now
      const { error: err } = await supabase.from("subscribers").insert({
        email: email.trim().toLowerCase(),
      });
      if (err) {
        if (err.code === "23505") {
          localStorage.setItem(SUBSCRIBED_KEY, "1");
          navigate("/", { replace: true });
          window.location.reload();
          return;
        }
        throw err;
      }
      localStorage.setItem(SUBSCRIBED_KEY, "1");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      setError("Não foi possível cadastrar. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="hero-ornament mb-8 flex flex-col items-center">
        <div
          className="h-12 w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--gold))",
          }}
        />
        <div
          className="mt-0 h-1.5 w-1.5 rotate-45"
          style={{ background: "var(--gold)" }}
        />
        <div
          className="mt-0 h-4 w-px"
          style={{
            background: "linear-gradient(to bottom, var(--gold), transparent)",
          }}
        />
      </div>
      <h1
        className="mb-2 font-display text-[clamp(24px,4vw,36px)] font-semibold tracking-wide"
        style={{ color: "var(--gold)" }}
      >
        Centelhas Divinas
      </h1>
      <p
        className="mb-8 max-w-md text-center text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        Livro 1: O Reator Humano — uma série de ficção científica por Bruno Rosa.
      </p>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          required
          disabled={loading}
          className="w-full rounded border bg-transparent px-4 py-3 font-sans text-base outline-none transition-colors placeholder:opacity-60 disabled:opacity-50"
          style={{
            borderColor: "var(--divider)",
            color: "var(--text)",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded border px-6 py-3 font-display text-[10px] font-normal uppercase tracking-[3px] transition-all hover:border-[var(--gold-dim)] disabled:opacity-50"
          style={{
            borderColor: "var(--divider)",
            color: "var(--gold-dim)",
            background: "none",
          }}
        >
          {loading ? "Cadastrando…" : "Começar a ler"}
        </button>
        {error && (
          <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
            {error}
          </p>
        )}
      </form>
      <p
        className="mt-8 max-w-sm text-center text-xs"
        style={{ color: "var(--text-muted)", opacity: 0.8 }}
      >
        Ao informar seu e-mail, você concorda em receber novidades sobre Centelhas
        Divinas. Respeitamos sua privacidade.
      </p>
    </div>
  );
}
