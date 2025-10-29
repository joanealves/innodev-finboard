import { useFilters } from '../../store/filterStore';
import { useTransactions } from '../../hooks/useTransactions';


export default function FiltersBar() {
    const { vocab } = useTransactions();
    const { dateFrom, dateTo, accounts, industries, states, setDateFrom, setDateTo, setAccounts, setIndustries, setStates, reset } = useFilters();


    return (
        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-5 mb-4">
            <div>
                <label className="block text-sm mb-1">De</label>
                <input type="date" value={dateFrom ?? ''} onChange={(e) => setDateFrom(e.target.value || undefined)} className="w-full rounded-xl2 border border-ink-300 dark:border-ink-700 bg-card-light dark:bg-card-dark px-3 py-2" />
            </div>
            <div>
                <label className="block text-sm mb-1">Até</label>
                <input type="date" value={dateTo ?? ''} onChange={(e) => setDateTo(e.target.value || undefined)} className="w-full rounded-xl2 border border-ink-300 dark:border-ink-700 bg-card-light dark:bg-card-dark px-3 py-2" />
            </div>
            <div>
                <label className="block text-sm mb-1">Contas</label>
                <select multiple value={accounts} onChange={(e) => setAccounts(Array.from(e.target.selectedOptions).map(o => o.value))} className="w-full rounded-xl2 border border-ink-300 dark:border-ink-700 bg-card-light dark:bg-card-dark px-3 py-2 h-[42px]">
                    {vocab.accounts.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm mb-1">Indústrias</label>
                <select multiple value={industries} onChange={(e) => setIndustries(Array.from(e.target.selectedOptions).map(o => o.value))} className="w-full rounded-xl2 border border-ink-300 dark:border-ink-700 bg-card-light dark:bg-card-dark px-3 py-2 h-[42px]">
                    {vocab.industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm mb-1">Estados</label>
                <div className="flex gap-2">
                    <select multiple value={states} onChange={(e) => setStates(Array.from(e.target.selectedOptions).map(o => o.value))} className="w-full rounded-xl2 border border-ink-300 dark:border-ink-700 bg-card-light dark:bg-card-dark px-3 py-2 h-[42px]">
                        {vocab.states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={reset} className="shrink-0 rounded-xl2 border border-ink-300 dark:border-ink-700 px-3">Limpar</button>
                </div>
            </div>
        </section>
    );
}