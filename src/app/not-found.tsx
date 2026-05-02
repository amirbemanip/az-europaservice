import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-[120px] font-black text-[#0a0a0a] leading-none mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#0a0a0a] mb-6">Seite nicht gefunden</h2>
        <p className="text-[#76777d] max-w-md mx-auto mb-10 leading-relaxed">
          Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben. 
          Kehren Sie zur Startseite zurück oder kontaktieren Sie uns.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-[#fed01b] text-[#0a0a0a] text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[#eec200] transition-all">
            <Home className="w-4 h-4" />
            Zur Startseite
          </Link>
          <Link href="/kontakt" className="inline-flex items-center gap-2 px-8 py-4 border border-[#0a0a0a] text-[#0a0a0a] text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[#f7f9fb] transition-all">
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </div>
  );
}
