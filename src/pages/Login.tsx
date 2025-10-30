import { FormEvent, useState } from 'react'
import { useAuth } from '@/store/authStore'
import { Helmet } from 'react-helmet-async'
import { BarChart3, Lock, Mail, Eye, EyeOff, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react'
import ThemeToggle from '@/componenents/common/ThemeToggle'

export default function Login() {
  const login = useAuth(s => s.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      setError(null)
      await login(email, password)
      await new Promise(r => setTimeout(r, 400))
      window.location.href = '/'
    } catch (err: any) {
      setError(err?.message ?? 'Erro ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
      <Helmet>
        <title>Login — FinBoard</title>
        <meta name="description" content="Acesse sua dashboard financeira profissional com análises" />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900" />

      {/* Form */}
      <div className="relative flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-20 animate-fade-in">
        <div className="absolute top-6 right-6 z-10">
          <div className="glass rounded-xl p-2"><ThemeToggle/></div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-10">
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 shadow-2xl mb-6">
              <BarChart3 className="text-white" size={40} />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full border-4 border-white dark:border-slate-900" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Bem-vindo!</h1>
            <p className="text-ink-500 text-lg">Entre para acessar seu dashboard financeiro</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-500"><Mail size={18}/></div>
                <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" placeholder="seu@email.com" required />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold">Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-500"><Lock size={18}/></div>
                <input id="password" type={show ? 'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} className="w-full pl-12 pr-14 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" placeholder="••••••••" required />
                <button type="button" onClick={()=>setShow(!show)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-ink-500 hover:text-ink-300">{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
              </div>
            </div>

            {error && <div className="rounded-xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-800 px-4 py-3.5 text-sm text-rose-600 dark:text-rose-400 font-medium">⚠️ {error}</div>}

            <button type="submit" disabled={loading} className="relative w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 hover:from-blue-600 hover:via-violet-600 hover:to-pink-600 text-white font-bold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? <><div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" /> Entrando...</> : <>Entrar no Dashboard <Sparkles size={18}/></>}
            </button>

            <div className="text-center p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-400 font-medium flex items-center justify-center gap-2">
                <Sparkles size={16} className="text-amber-500" /> Use qualquer e-mail e senha para demonstração
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Showcase */}
      <div className="hidden lg:flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-pink-600" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-lg px-12 text-white">
          <div className="glass rounded-3xl p-10 border-2 border-white/20 shadow-2xl backdrop-blur-xl">
            <h2 className="text-4xl font-bold mb-6">Dashboard Financeiro Inteligente</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">Gerencie suas finanças com visualizações poderosas e insights</p>
            <div className="space-y-5">
              {[{ icon: TrendingUp, title:'Análises Avançadas', desc:'Gráficos interativos com dados em tempo real' }, { icon: Shield, title:'Seguro & Confiável', desc:'Seus dados protegidos' }, { icon: Zap, title:'Rápido & Eficiente', desc:'Performance otimizada' }].map(({icon:Icon,title,desc},i)=>(
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20"><Icon size={24}/></div>
                  <div><h3 className="font-bold text-lg mb-1">{title}</h3><p className="text-white/80 text-sm">{desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
