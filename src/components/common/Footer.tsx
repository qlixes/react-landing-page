import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-gradient border-t border-gold-primary/20 text-white">

      {/* Bottom Bar */}
      <div className="border-t border-gold-primary/10">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center md:text-left">
            © {currentYear} PT. Sunsse Baru Indonesia. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-xs hover:text-gold-primary transition-colors duration-200"
            >
              Sitemap
            </a>
            <span className="text-white/20">·</span>
            <a
              href="/"
              className="text-xs hover:text-gold-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="text-white/20">·</span>
            <a
              href="/"
              className="text-xs hover:text-gold-primary transition-colors duration-200"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}