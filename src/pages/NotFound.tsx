export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-ink-500">Página não encontrada.</p>
        <a href="/" className="inline-block mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white">Voltar</a>
      </div>
    </div>
  )
}
