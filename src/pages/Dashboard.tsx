import { Helmet } from 'react-helmet-async';
import AppShell from '../componenents/layout/AppShell';
import FiltersBar from '../componenents/dashboard/FiltersBar';
import SummaryCards from '../componenents/dashboard/SummaryCards';
import { useTransactions } from '../hooks/useTransactions';
import LineVolume from '../componenents/charts/LineVolume';
import StackedBars from '../componenents/charts/StackedBars';


export default function Dashboard() {
  const { loading, error, filtered, totals } = useTransactions();


  return (
    <AppShell>
      <Helmet>
        <title>Dashboard — FinBoard</title>
        <meta name="description" content="Dashboard financeiro com filtros e gráficos." />
      </Helmet>


      <h2 className="text-xl font-semibold mb-4">Dashboard Financeiro</h2>
      <FiltersBar />
      {loading && <p>Carregando transações…</p>}
      {error && <p className="text-red-500">{error}</p>}


      {!loading && !error && (
        <>
          <SummaryCards balance={totals.balance} deposits={totals.deposits} withdraws={totals.withdraws} pending={totals.pending} />


          <section className="grid gap-4 lg:grid-cols-2">
            <LineVolume data={filtered} />
            <StackedBars data={filtered} />
          </section>


          <section className="mt-6 rounded-xl2 border border-ink-200 dark:border-ink-800 bg-card-light dark:bg-card-dark">
            <header className="px-4 py-3 border-b border-ink-200 dark:border-ink-800 flex items-center justify-between">
              <h3 className="font-medium">Histórico de transações</h3>
              <span className="text-sm opacity-70">{filtered.length} itens</span>
            </header>
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left sticky top-0 bg-card-light dark:bg-card-dark">
                  <tr>
                    <th className="px-4 py-2">Data</th>
                    <th className="px-4 py-2">Conta</th>
                    <th className="px-4 py-2">Indústria</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2">Tipo</th>
                    <th className="px-4 py-2">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t, i) => (
                    <tr key={i} className="border-t border-ink-100 dark:border-ink-900">
                      <td className="px-4 py-2">{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-4 py-2">{t.account}</td>
                      <td className="px-4 py-2">{t.industry}</td>
                      <td className="px-4 py-2">{t.state}</td>
                      <td className="px-4 py-2">{t.transaction_type}</td>
                      <td className="px-4 py-2">{(Number(t.amount) / 100).toLocaleString('pt-BR', { style: 'currency', currency: t.currency || 'BRL' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </AppShell>
  );
}