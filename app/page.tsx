import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const statusStyle: Record<string, string> = {
  to_do: "bg-gray-100 text-gray-700",
  in_progress: "bg-amber-100 text-amber-800",
  done: "bg-green-100 text-green-800",
};

const statusLabel: Record<string, string> = {
  to_do: "À faire",
  in_progress: "En cours",
  done: "Terminé",
};

export default async function Home() {
  const { data: features, error } = await supabase
    .from("features")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-xl font-bold">Erreur Supabase</h1>
        <pre className="text-red-600">{error.message}</pre>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Roadmap produit</h1>
      <p className="text-gray-500 mb-8">{features?.length ?? 0} fonctionnalités</p>

      <ul className="grid gap-4">
        {features?.map((f) => (
          <li
            key={f.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-lg">{f.title}</h2>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  statusStyle[f.status] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {statusLabel[f.status] ?? f.status}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{f.description}</p>
            <div className="mt-3 flex gap-3 text-xs text-gray-400">
              <span>Priorité : {f.priority}</span>
              <span>Difficulté : {f.difficulty}/5</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}