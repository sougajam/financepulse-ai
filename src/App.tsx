import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { AdminCreate } from "./pages/AdminCreate";
import { SIP } from "./pages/calculators/SIP";
import { EMI } from "./pages/calculators/EMI";
import { Inflation } from "./pages/calculators/Inflation";
import { FIRE } from "./pages/calculators/FIRE";
import { CompoundInterest } from "./pages/calculators/CompoundInterest";
import { NetWorth } from "./pages/calculators/NetWorth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Markets } from "./pages/Markets";
import { Economy } from "./pages/Economy";
import { PersonalFinance } from "./pages/PersonalFinance";
import { Investing } from "./pages/Investing";
import { AI } from "./pages/AI";
import { Calculators } from "./pages/Calculators";
import { Articles } from "./pages/Articles";
import { ArticleDetail } from "./pages/ArticleDetail";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/economy" element={<Economy />} />
            <Route path="/personal-finance" element={<PersonalFinance />} />
            <Route path="/investing" element={<Investing />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/calculators/sip" element={<SIP />} />
            <Route path="/calculators/emi" element={<EMI />} />
            <Route
              path="/calculators/compound-interest"
              element={<CompoundInterest />}
            />
            <Route
              path="/admin/create"
              element={
                <>
                  <SignedIn>
                    <AdminCreate />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route path="/calculators/inflation" element={<Inflation />} />
            <Route path="/calculators/net-worth" element={<NetWorth />} />
            <Route path="/calculators/fire" element={<FIRE />} />
            {/* Our new Article routes */}
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
