"use client"

import { useState } from "react"
import WelcomeScreen from "@/components/screens/welcome-screen"
import QuestionnaireScreen from "@/components/screens/questionnaire-screen"
import ResultScreen from "@/components/screens/result-screen"
import type { QuestionnaireData, ResultData } from "@/lib/types"

export default function Home() {
  const [screen, setScreen] = useState<"welcome" | "questionnaire" | "result">("welcome")
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null)
  const [resultData, setResultData] = useState<ResultData | null>(null)

  const handleStartQuestionnaire = () => {
    setScreen("questionnaire")
  }

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data)
    // Calculate score and generate result
    const result = calculateScore(data)
    setResultData(result)
    setScreen("result")
  }

  const handleNewTest = () => {
    setQuestionnaireData(null)
    setResultData(null)
    setScreen("welcome")
  }

  return (
    <main className="min-h-screen">
      {screen === "welcome" && <WelcomeScreen onStart={handleStartQuestionnaire} />}
      {screen === "questionnaire" && <QuestionnaireScreen onComplete={handleQuestionnaireComplete} />}
      {screen === "result" && resultData && <ResultScreen data={resultData} onNewTest={handleNewTest} />}
    </main>
  )
}

// Score calculation logic based on WHO severe malaria criteria
function calculateScore(data: QuestionnaireData): ResultData {
  let score = 0
  const criteres: string[] = []

  // Age factor (young children and elderly at higher risk)
  if (data.age < 5) {
    score += 15
    criteres.push("Enfant de moins de 5 ans")
  } else if (data.age > 65) {
    score += 10
  }

  // Fever presence
  if (data.hasFever) {
    score += 20
  }

  // Temperature
  if (data.temperature >= 39.5) {
    score += 15
    criteres.push("Fièvre élevée (≥39.5°C)")
  } else if (data.temperature >= 38) {
    score += 10
  }

  // Severe malaria criteria (WHO)
  if (data.troubleConsciousness) {
    score += 25
    criteres.push("Trouble de la conscience")
  }

  if (data.convulsions) {
    score += 20
    criteres.push("Convulsions")
  }

  if (data.severeAnemia) {
    score += 15
    criteres.push("Anémie sévère")
  }

  if (data.respiratoryDistress) {
    score += 20
    criteres.push("Détresse respiratoire")
  }

  if (data.jaundice) {
    score += 10
    criteres.push("Ictère")
  }

  if (data.hemoglobinuria) {
    score += 15
    criteres.push("Hémoglobinurie")
  }

  // Parasitemia
  if (data.hasParasitemia && data.parasitemiaLevel) {
    if (data.parasitemiaLevel >= 5) {
      score += 20
      criteres.push(`Parasitémie élevée (${data.parasitemiaLevel}%)`)
    } else if (data.parasitemiaLevel >= 2) {
      score += 10
    }
  }

  // Cap score at 100
  score = Math.min(score, 100)

  // Determine risk level and recommendation
  let riskLevel: "FAIBLE" | "MODÉRÉ" | "ÉLEVÉ" | "TRÈS ÉLEVÉ"
  let riskColor: string
  let recommendation: string

  if (score < 25) {
    riskLevel = "FAIBLE"
    riskColor = "#34C759"
    recommendation = "Consultation externe simple recommandée. Surveillance des symptômes."
  } else if (score < 50) {
    riskLevel = "MODÉRÉ"
    riskColor = "#FFC107"
    recommendation = "Consultation médicale recommandée dans les 24 heures. Test de diagnostic rapide (TDR) conseillé."
  } else if (score < 75) {
    riskLevel = "ÉLEVÉ"
    riskColor = "#FF9500"
    recommendation = "Consultation médicale URGENTE requise. Prise en charge immédiate nécessaire."
  } else {
    riskLevel = "TRÈS ÉLEVÉ"
    riskColor = "#FF3B30"
    recommendation = "⚠️ URGENCES IMMÉDIATES - Signes de paludisme grave. Hospitalisation requise."
  }

  return {
    score,
    riskLevel,
    riskColor,
    recommendation,
    criteres,
    severeCriteriaCount: criteres.length,
  }
}
