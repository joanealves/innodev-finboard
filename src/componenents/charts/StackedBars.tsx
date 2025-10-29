import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useMemo } from 'react';
import type { Transaction } from '../../types';
import { fmt } from '../../utils/dates';
import { parseAmount } from '../../utils/parse';


export default function StackedBars({ data }: { data: Transaction[] }) {
    const series = useMemo(() => {
        const m = new Map<string, { deposit: number; withdraw: number }>();
        for (const t of data) {
            const key = fmt(t.date, 'yyyy-MM'); 
            const obj = m.get(key) ?? { deposit: 0, withdraw: 0 };
            const v = parseAmount(t.amount);
            if (t.transaction_type === 'deposit') obj.deposit += v; else obj.withdraw += v;
            m.set(key, obj);
        }
        return [...m.entries()]
            .map(([month, { deposit, withdraw }]) => ({ month, deposit, withdraw }))
            .sort((a, b) => a.month.localeCompare(b.month));
    }, [data]);


    return (
        <div className="rounded-xl2 border border-ink-200 dark:border-ink-800 bg-card-light dark:bg-card-dark p-4">
            <h3 className="font-medium mb-3">Receitas x Despesas (mensal)</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={series} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="deposit" stackId="a" fill="currentColor" />
                        <Bar dataKey="withdraw" stackId="a" fill="currentColor" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}