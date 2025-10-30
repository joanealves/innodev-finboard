import { Helmet } from 'react-helmet-async';
import AppShell from '@/componenents/layout/AppShell';
import Sidebar from '@/componenents/layout/Sidebar';

import FiltersBar from '@/componenents/layout/Sidebar';
import SummaryCards from '@/componenents/dashboard/SummaryCards';
import LineVolume from '@/componenents/charts/LineVolume';
import StackedBars from '@/componenents/charts/StackedBars';
import TransactionsTable from '@/componenents/dashboard/TransactionsTable';

import { Sparkles, AlertCircle, TrendingUp } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';

export default function Dashboard() {
  const { loading, error, filtered, totals } = useTransactions();

  return (
    <AppShell sidebar={<Sidebar />}>
      <Helmet>
        <title>Dashboard — FinBoard | Análise Financeira Inteligente</title>
        <meta name="description" content="Dashboard financeiro completo com visualizações em tempo real, filtros dinâmicos e análises detalhadas." />
      </Helmet>

      {/* Título */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[oklch(var(--primary)/15%)]">
          <Sparkles className="text-[oklch(var(--primary))]" size={18} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Dashboard Financeiro</h1>
          <p className="text-muted-foreground">Visão completa das suas transações e análises</p>
        </div>
      </div>

      {/* Filtros */}
      <FiltersBar />

      {/* Estados */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-10 w-10 rounded-full border-4 border-input border-t-[oklch(var(--primary))] animate-spin" />
          <p className="mt-3 text-sm text-muted-foreground">Carregando dados…</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-[oklch(var(--destructive)/30%)] p-4 bg-[oklch(var(--destructive)/8%)]">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-[oklch(var(--destructive))]" />
            <div>
              <p className="font-medium">Erro ao carregar dados</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      {!loading && !error && (
        <>
          <SummaryCards
            balance={totals.balance}
            deposits={totals.deposits}
            withdraws={totals.withdraws}
            pending={totals.pending}
          />

          <section className="grid gap-6 lg:grid-cols-2">
            <LineVolume data={filtered} />
            <StackedBars data={filtered} />
          </section>

          <TransactionsTable data={filtered} />

          {filtered.length === 0 && (
            <div className="rounded-xl border border-border p-10 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[oklch(var(--primary)/15%)]">
                <TrendingUp className="text-[oklch(var(--primary))]" size={26} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Nenhuma transação encontrada</h3>
              <p className="text-sm text-muted-foreground">
                Ajuste os filtros para visualizar resultados.
              </p>
            </div>
          )}
        </>
      )}
    </AppShell>
  );
}
