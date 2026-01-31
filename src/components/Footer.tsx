import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">
                MathCode<span className="gradient-text">Academy</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Master the mathematics behind modern programming, from algorithms to AI.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Learning</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/curriculum" className="hover:text-foreground transition-colors">Curriculum</Link></li>
              <li><Link to="/curriculum" className="hover:text-foreground transition-colors">Foundation Track</Link></li>
              <li><Link to="/curriculum" className="hover:text-foreground transition-colors">ML/AI Track</Link></li>
              <li><Link to="/curriculum" className="hover:text-foreground transition-colors">Security Track</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Forums</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Discord</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 MathCode Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
