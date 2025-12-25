"use client"

import { Button } from "@/components/ui/button"
import { Activity, ShieldCheck, UserCheck, Stethoscope, ArrowRight } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-teal-50 to-transparent -z-10" />
      <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl w-full flex flex-col items-center space-y-12 animate-slide-up">

        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-4 animate-fade-in delay-100">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-600 tracking-wide">Protocole OMS 2025</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Kiosque <span className="text-teal-600">Santé</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
            Système intelligent de pré-diagnostic et d'orientation pour le paludisme.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-slide-up delay-200">
          <FeatureCard
            icon={<Stethoscope className="w-8 h-8 text-teal-600" />}
            title="Diagnostic Rapide"
            description="Algorithme basé sur les symptômes cliniques majeurs."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8 text-teal-600" />}
            title="Fiabilité Médicale"
            description="Conforme aux directives nationales de prise en charge."
          />
          <FeatureCard
            icon={<UserCheck className="w-8 h-8 text-teal-600" />}
            title="Orientation Immédiate"
            description="Recommandations claires selon le niveau de risque."
          />
        </div>

        {/* Call to Action */}
        <div className="pt-8 w-full flex flex-col items-center space-y-6 animate-slide-up delay-300">
          <Button
            onClick={onStart}
            size="lg"
            className="group relative overflow-hidden bg-teal-600 hover:bg-teal-700 text-white px-12 py-8 text-2xl rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 w-full md:w-auto"
          >
            <div className="flex items-center gap-4 relative z-10">
              <span>Commencer l'Évaluation</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
            {/* Glossy effect */}
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10" />
          </Button>

          <p className="text-slate-400 text-sm font-medium">
            Temps estimé : 2 minutes • Anonyme & Confidentiel
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow group">
      <div className="p-4 bg-teal-50 rounded-xl group-hover:bg-teal-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}
