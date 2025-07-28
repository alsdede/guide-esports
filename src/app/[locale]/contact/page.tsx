import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center py-16">
      <main className="w-full max-w-lg bg-black/40 rounded-xl shadow-lg p-8 border border-white/10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">{t('title') || 'Fale Conosco'}</h1>
        <p className="text-gray-300 mb-8 text-center">{t('subtitle') || 'Envie sua mensagem, dúvida ou sugestão.'}</p>
        <form className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="block text-gray-200 mb-1">{t('name') || 'Nome'}</label>
            <input id="name" name="name" type="text" required className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-200 mb-1">{t('email') || 'E-mail'}</label>
            <input id="email" name="email" type="email" required className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-200 mb-1">{t('message') || 'Mensagem'}</label>
            <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors">{t('send') || 'Enviar'}</button>
        </form>
        <div className="text-center mt-6">
          <Link href="/" className="text-blue-400 hover:underline">{t('backHome') || 'Voltar para o início'}</Link>
        </div>
      </main>
    </div>
  );
}
