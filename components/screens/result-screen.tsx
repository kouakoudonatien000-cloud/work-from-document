"use client"

import { Button } from "@/components/ui/button"
import { Printer, RefreshCcw, AlertTriangle, FileText, CheckCircle2, Info } from "lucide-react"
import type { ResultData } from "@/lib/types"

interface ResultScreenProps {
  data: ResultData
  onNewTest: () => void
}

export default function ResultScreen({ data, onNewTest }: ResultScreenProps) {
  const handlePrint = () => {
    window.print()
  }

  // Determine official theme colors based on risk
  const getTheme = () => {
    if (data.score < 25) return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: "text-emerald-600" }
    if (data.score < 50) return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "text-amber-600" }
    return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: "text-red-600" }
  }

  const theme = getTheme()

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-4xl w-full space-y-6 animate-slide-up">

        {/* Medical Header (Pseudo-Letterhead) */}
        <div className="bg-white rounded-t-3xl shadow-sm p-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800">Rapport d'Orientation</h2>
              <p className="text-slate-500 text-sm">Généré par Kiosque Santé • Protocole OMS</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Date de l'évaluation</p>
              <p className="text-slate-700 font-medium">
                {new Date().toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-b-3xl shadow-xl overflow-hidden -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-12">

            {/* Left Column: Score Visualization */}
            <div className="md:col-span-5 bg-slate-50 p-8 md:p-12 flex flex-col items-center justify-center border-r border-slate-100">
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Circular Background */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-200" />
                  <circle
                    cx="96" cy="96" r="88"
                    stroke="currentColor" strokeWidth="12" fill="transparent"
                    strokeDasharray={2 * Math.PI * 88}
                    strokeDashoffset={2 * Math.PI * 88 * (1 - data.score / 100)}
                    className={`${theme.text} transition-all duration-1000 ease-out`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${theme.text}`}>{data.score}</span>
                  <span className="text-slate-400 text-sm font-medium uppercase mt-1">Niveau</span>
                </div>
              </div>

              <div className={`mt-8 px-6 py-2 rounded-full font-bold text-lg tracking-wide uppercase ${theme.bg} ${theme.text} border ${theme.border}`}>
                RISQUE {data.riskLevel}
              </div>
            </div>

            {/* Right Column: Details & Recommendation */}
            <div className="md:col-span-7 p-8 md:p-12 space-y-8">

              <div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Recommandation Officielle</h3>
                <div className={`p-6 rounded-2xl ${theme.bg} ${theme.border} border-l-4`}>
                  <p className={`text-lg font-medium leading-relaxed ${theme.text}`}>
                    {data.recommendation}
                  </p>
                </div>
              </div>

              {/* Severe Criteria List */}
              {data.criteres.length > 0 ? (
                <div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Facteurs de Gravité Identifiés
                  </h3>
                  <ul className="space-y-3">
                    {data.criteres.map((critere, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        <span>{critere}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">Aucun signe de gravité majeur</p>
                    <p className="text-slate-500 text-sm mt-1">Continuez à surveiller l'apparition de nouveaux symptômes.</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 text-xs text-slate-400 bg-slate-50 p-4 rounded-xl">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>Ce résultat est indicatif et ne remplace pas un diagnostic médical complet. En cas de doute, consultez toujours un professionnel de santé.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 print:hidden">
          <Button
            onClick={handlePrint}
            variant="outline"
            size="lg"
            className="h-14 font-medium text-slate-600 border-2 hover:bg-slate-50 hover:text-slate-900"
          >
            <Printer className="mr-2 h-5 w-5" />
            Imprimer le rapport
          </Button>
          <Button
            onClick={onNewTest}
            size="lg"
            className="h-14 font-medium bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Nouvelle Évaluation
          </Button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { background: white; }
          .animate-slide-up { animation: none !important; opacity: 1 !important; transform: none !important; }
          .print\\:hidden { display: none !important; }
          .shadow-xl, .shadow-sm { box-shadow: none !important; }
        }
      `}</style>
    </div>
  )
}
