
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

import ContactForm from './ContactForm';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');

  const translations = {
    title: t('title') || 'Fale Conosco',
    subtitle: t('subtitle') || 'Envie sua mensagem, dúvida ou sugestão.',
    name: t('name') || 'Nome',
    email: t('email') || 'E-mail',
    message: t('message') || 'Mensagem',
    send: t('send') || 'Enviar',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center py-16">
      <main className="w-full max-w-lg bg-black/40 rounded-xl shadow-lg p-8 border border-white/10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">{translations.title}</h1>
        <p className="text-gray-300 mb-8 text-center">{translations.subtitle}</p>
        <ContactForm translations={translations} />
      </main>
    </div>
  );
}
