import { Link } from '@/i18n/navigation';

export function LanguageSwitcher({ locale }: { locale: string }) {
  return (
    <div className="fixed bottom-4 right-4">
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-white/10">
        <div className="flex space-x-2">
          <Link 
            href="/schedule" 
            locale="pt" 
            className={`px-3 py-1 rounded text-sm ${locale === 'pt' ? 'bg-slate-800 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            🇧🇷 PT
          </Link>
          <Link 
            href="/schedule" 
            locale="en" 
            className={`px-3 py-1 rounded text-sm ${locale === 'en' ? 'bg-slate-800 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            🇺🇸 EN
          </Link>
        </div>
      </div>
    </div>
  );
}
