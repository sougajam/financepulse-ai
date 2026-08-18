import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import {
  Calculator,
  TrendingUp,
  Landmark,
  PiggyBank,
  Flame,
} from "lucide-react";

const tools = [
  {
    id: "sip",
    title: "SIP Calculator",
    description:
      "Calculate the future value of your monthly mutual fund investments.",
    icon: TrendingUp,
    path: "/calculators/sip",
    color: "text-emerald-500",
  },
  {
    id: "emi",
    title: "EMI Calculator",
    description:
      "Plan your loan repayment with our monthly installment calculator.",
    icon: Landmark,
    path: "/calculators/emi",
    color: "text-blue-500",
  },
  {
    id: "compound",
    title: "Compound Interest",
    description:
      "See how your money grows over time with the power of compounding.",
    icon: PiggyBank,
    path: "/calculators/compound-interest",
    color: "text-purple-500",
  },
  {
    id: "inflation",
    title: "Inflation Calculator",
    description:
      "Understand how inflation affects your future purchasing power.",
    icon: Calculator,
    path: "/calculators/inflation",
    color: "text-rose-500",
  },
  {
    id: "net-worth",
    title: "Net Worth Calculator",
    description:
      "Track your true wealth by balancing your assets and liabilities.",
    icon: Landmark, // Reusing Landmark icon
    path: "/calculators/net-worth",
    color: "text-blue-600",
  },
  {
    id: "fire",
    title: "FIRE Calculator",
    description: "Find out exactly when you can reach financial independence.",
    icon: Flame,
    path: "/calculators/fire",
    color: "text-orange-500",
  },
];

export function Calculators() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Financial Calculators
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Free, easy-to-use tools to help you plan your financial future.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              className="hover:border-emerald-500 transition-colors"
            >
              <Link
                to={tool.path}
                className="p-6 flex items-start gap-4 h-full"
              >
                <div
                  className={`p-3 bg-slate-100 dark:bg-slate-800 rounded-lg ${tool.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {tool.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {tool.description}
                  </p>
                </div>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
