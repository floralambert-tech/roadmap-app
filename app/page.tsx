import { supabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";
export default async function Home() {
  const { data: features, error } = await supabase
    .from("features")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Erreur Supabase</h1>
        <pre>{error.message}</pre>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        Roadmap — {features?.length ?? 0} features
      </h1>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {features?.map((f) => (
          <li
            key={f.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <strong>{f.title}</strong>
            <span style={{ marginLeft: 8, fontSize: 12, color: "#666" }}>
              [{f.status}] · {f.priority}
            </span>
            <p style={{ margin: "8px 0 0", color: "#444" }}>{f.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
