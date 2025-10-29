import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useMemo } from 'react';
import type { Transaction } from '../../types';
import { fmt } from '../../utils/dates';
import { parseAmount } from '../../utils/parse';


export default function LineVolume({ data }: { data: Transaction[] }) {
    const series = useMemo(() => {
        const m = new Map<string, number>();
        for (const t of data) {
            const key = fmt(t.date, 'yyyy-MM-dd');
            const v = (m.get(key) ?? 0) + parseAmount(t.amount) * (t.transaction_type === 'deposit' ? 1 : -1);
            m.set(key, v);
        }
        return [...m.entries()].map(([date, value]) => ({ date, value })).sort((a, b) => a.date.localeCompare(b.date));
    }, [data]);


    return (
        <div className="rounded-xl2 border border-ink-200 dark:border-ink-800 bg-card-light dark:bg-card-dark p-4">
            <h3 className="font-medium mb-3">Saldo por dia</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={series} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" dot={false} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}