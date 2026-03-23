import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/contexts/LangContext";

export function EmailCapture() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return;
    setLoading(true);
    try {
      if (!supabase) {
        setSuccess(true);
        return;
      }
      const { error: err } = await supabase.from("subscribers").insert({
        name: name.trim() || null,
        email: email.trim().toLowerCase(),
      });
      if (err) {
        if (err.code === "23505") {
          setSuccess(true);
          return;
        }
        throw err;
      }
      setSuccess(true);
    } catch {
      setError(t.emailError);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="border-t pt-10 text-center font-display text-[10px] uppercase tracking-[3px]"
        style={{ borderColor: "var(--divider)", color: "var(--gold-dim)" }}
      >
        {t.emailSuccess}
      </div>
    );
  }

  return (
    <div
      className="border-t pt-10"
      style={{ borderColor: "var(--divider)" }}
    >
      <h3
        className="mb-2 font-display text-sm font-normal uppercase tracking-[4px]"
        style={{ color: "var(--gold)" }}
      >
        {t.emailCaptureTitle}
      </h3>
      <p
        className="mb-4 text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        {t.emailCaptureDescription}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          disabled={loading}
          className="flex-1 rounded-none border bg-transparent px-4 py-3 font-serif text-sm outline-none transition-colors placeholder:opacity-60 disabled:opacity-50"
          style={{
            borderWidth: "1px",
            borderColor: "var(--divider)",
            color: "var(--text)",
          }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          required
          disabled={loading}
          className="flex-1 rounded-none border bg-transparent px-4 py-3 font-serif text-sm outline-none transition-colors placeholder:opacity-60 disabled:opacity-50"
          style={{
            borderWidth: "1px",
            borderColor: "var(--divider)",
            color: "var(--text)",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-none border px-6 py-3 font-serif text-[10px] font-normal uppercase tracking-[3px] transition-all hover:border-[var(--gold-dim)] disabled:opacity-50"
          style={{
            borderWidth: "1px",
            borderColor: "var(--divider)",
            color: "var(--gold-dim)",
            background: "none",
          }}
        >
          {loading ? t.registering : t.emailCaptureButton}
        </button>
      </form>
      {error && (
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          {error}
        </p>
      )}
      <p
        className="mt-3 max-w-md text-xs"
        style={{ color: "var(--text-muted)", opacity: 0.8 }}
      >
        {t.privacyNote}
      </p>
    </div>
  );
}
