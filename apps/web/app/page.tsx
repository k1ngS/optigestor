export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-20">
      <h1 className="text-3xl font-bold">OptiGestor Lean MVP v0.1</h1>
      <p className="text-base text-slate-600">
        Monorepo inicial pronto para evolução com IA: web executável, pacotes compartilhados e schema Drizzle base.
      </p>
      <div className="rounded-lg border border-slate-200 p-4 text-sm">
        Próximo passo: executar <code className="rounded bg-slate-100 px-1 py-0.5">pnpm db:generate</code> e iniciar o módulo de autenticação + RBAC.
      </div>
    </main>
  );
}
