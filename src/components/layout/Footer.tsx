import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Activity className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                FinancePulse AI
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Understand Money. Understand Markets. Financial intelligence made
              simple.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="/markets"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Markets
                </Link>
              </li>
              <li>
                <Link
                  to="/economy"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Economy
                </Link>
              </li>
              <li>
                <Link
                  to="/calculators"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Calculators
                </Link>
              </li>
              <li>
                <Link
                  to="/ai"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  AI Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Get weekly macroeconomic insights straight to your inbox.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="px-3 py-2 w-full rounded-l-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:border-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-r-md text-sm font-medium transition-colors">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-slate-400 mt-2">
              Newsletter backend coming soon.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} FinancePulse AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
