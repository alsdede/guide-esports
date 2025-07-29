import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function Header() {
  const tNav = await getTranslations('Navigation');
  return (
    <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 border-t border-white/10  ">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          🎮 BetEsports
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-slate-300 transition-colors">{tNav('home')}</Link>

          <Link href="/tournaments" className="text-white hover:text-slate-300 transition-colors">{tNav('tournaments')}</Link>
                    <Link href="/standings" className="text-white hover:text-slate-300 transition-colors">{tNav('standings')}</Link>
          <Link href="/schedule" className="text-white hover:text-slate-300 transition-colors">{tNav('schedule')}</Link>
          <Link href="/betting-houses" className="text-white hover:text-slate-300 transition-colors">{tNav('bettingHouses')}</Link>
          <Link href="/contact" className="text-white hover:text-slate-300 transition-colors">{tNav('contact') || 'Contato'}</Link>

        </div>
        <div className="flex space-x-3">
      
          <Link 
            href="/contact" 
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
          >
            {tNav('bePartner')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
