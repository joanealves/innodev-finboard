import { FormEvent, useState } from 'react';
import { useAuth } from '../store/authStore';
import { Helmet } from 'react-helmet-async';


export default function Login() {
    const login = useAuth((s) => s.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);


    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            setError(null);
            await login(email, password);
            location.href = '/';
        } catch (err: any) {
            setError(err?.message ?? 'Erro ao autenticar');
        }
    }


    return (
        <div className="min-h-screen grid place-items-center">
            <Helmet>
                <title>Login — FinBoard</title>
                <meta name="robots" content="noindex" />
            </Helmet>


            <form onSubmit={onSubmit} className="w-full max-w-sm bg-card-light dark:bg-card-dark border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card">
                <h1 className="text-xl font-semibold mb-4">Entrar</h1>
                <label className="block text-sm mb-1">E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 rounded-xl2 border border-ink-300 dark:border-ink-700 bg-transparent px-3 py-2" required />
                <label className="block text-sm mb-1">Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 rounded-xl2 border border-ink-300 dark:border-ink-700 bg-transparent px-3 py-2" required />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button className="w-full rounded-xl2 bg-ink-900 dark:bg-ink-50 text-ink-50 dark:text-ink-900 py-2 font-medium">Acessar</button>
            </form>
        </div>
    );
}