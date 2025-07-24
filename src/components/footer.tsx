
import Link from "next/link";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4c-5 0-9 4-9 9 0 3 2 6 5 7l-1 4s-1 4 2 2c2-2 3-4 3-6 1 0 3-1 3-5 0-3-2-5-5-5zm0 2c2 0 4 2 4 4 0 2-2 4-4 4s-4-2-4-4c0-2 2-4 4-4z"/>
        <path d="M12 11c-1 0-2 1-2 2 0 1 1 2 2 2s2-1 2-2c0-1-1-2-2-2z"/>
    </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10C2.5 6 7.5 4 12 4s9.5 2 9.5 3-2.5 4-2.5 4"/>
        <path d="M12 17.5a9.91 9.91 0 0 1-5-2.5"/>
        <path d="M12 17.5a9.91 9.91 0 0 0 5-2.5"/>
        <path d="M12 14.5a4.4 4.4 0 0 1-3-1.5 4.4 4.4 0 0 1 6 0 4.4 4.4 0 0 1-3 1.5z"/>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
        <path d="m9.5 14.5-2-2.5"/>
        <path d="m14.5 14.5 2-2.5"/>
    </svg>
);


export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <h3 className="font-headline text-xl font-bold text-primary mb-4">ArtisanConnect</h3>
            <p className="text-muted-foreground text-sm">Un Voyage au Cœur de l'Artisanat Marocain.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">Boutique</Link></li>
              <li><Link href="/cooperatives" className="text-muted-foreground hover:text-primary">Nos Coopératives</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">À Propos</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span>Essaouira, Maroc</span>
              </p>
            </div>
          </div>
           <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Suivez-nous</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="http://www.facebook.com/arganacraftsessaouira/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <FacebookIcon className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="http://www.instagram.com/arganacraftsessaouira/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <InstagramIcon className="h-6 w-6" />
                 <span className="sr-only">Instagram</span>
              </a>
              <a href="http://www.pinterest.com/arganacrafts" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <PinterestIcon className="h-6 w-6" />
                 <span className="sr-only">Pinterest</span>
              </a>
              <a href="http://www.youtube.com/@arganacraftsessaouira" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <YoutubeIcon className="h-6 w-6" />
                 <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
           <p>© {new Date().getFullYear()} ArtisanConnect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

    