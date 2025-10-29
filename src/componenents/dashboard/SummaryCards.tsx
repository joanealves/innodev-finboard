import { ArrowDownCircle, ArrowUpCircle, Clock, Wallet } from "lucide-react";
import { formatCurrency } from "../../utils/currency";

export default function SummaryCards({
  balance,
  deposits,
  withdraws,
  pending,
  currency = "BRL"
}: {
  balance: number;
  deposits: number;
  withdraws: number;
  pending: number;
  currency?: string;
}) {
  const items = [
    { label: "Saldo", value: balance, icon: Wallet },
    { label: "Receitas", value: deposits, icon: ArrowUpCircle },
    { label: "Despesas", value: withdraws, icon: ArrowDownCircle },
    { label: "Pendentes", value: pending, icon: Clock }
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4">
      {items.map(({ label, value, icon: Icon }) =>
        <article
          key={label}
          className="rounded-xl2 border border-ink-200 dark:border-ink-800 bg-card-light dark:bg-card-dark p-4 shadow-card"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-ink-600 dark:text-ink-300">
              {label}
            </h3>
            <Icon size={18} className="opacity-80" />
          </div>
          <p className="text-2xl font-semibold">
            {formatCurrency(value, currency)}
          </p>
        </article>
      )}
    </section>
  );
}
