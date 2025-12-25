"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"
import type { QuestionnaireData } from "@/lib/types"
import { questions } from "@/lib/questions"
import { cn } from "@/lib/utils"

interface QuestionnaireScreenProps {
  onComplete: (data: QuestionnaireData) => void
}

export default function QuestionnaireScreen({ onComplete }: QuestionnaireScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuestionnaireData>>({})
  const [error, setError] = useState("")

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (field: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleNext = () => {
    const question = questions[currentQuestion]
    const answer = answers[question.field as keyof QuestionnaireData]

    if (question.required && (answer === undefined || answer === "")) {
      setError("Veuillez répondre à cette question pour continuer")
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      onComplete(answers as QuestionnaireData)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setError("")
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header with Progress */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 w-full">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              Question {currentQuestion + 1} / {questions.length}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
            onClick={() => window.location.reload()}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="h-1 w-full bg-slate-100">
          <div
            className="h-full bg-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto">
        <div className="w-full max-w-2xl animate-fade-in space-y-8">

          {/* Question Card */}
          <div className="space-y-6 text-center">
            <span className="text-6xl filter drop-shadow-sm">{question.icon}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              {question.question}
            </h2>

            {question.helpText && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                <HelpCircle className="w-4 h-4" />
                {question.helpText}
              </div>
            )}
          </div>

          {/* Answer Area */}
          <div className="space-y-4 pt-4">
            {question.type === "radio" && question.options && (
              <div className="grid grid-cols-1 gap-3">
                {question.options.map((option) => {
                  const isSelected = answers[question.field as keyof QuestionnaireData] === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(question.field, option.value)}
                      className={cn(
                        "w-full p-6 text-left rounded-xl border-2 transition-all duration-200 group relative overflow-hidden",
                        isSelected
                          ? "border-teal-500 bg-teal-50/50 shadow-md ring-1 ring-teal-500"
                          : "border-slate-200 bg-white hover:border-teal-200 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span className={cn(
                          "text-xl font-medium",
                          isSelected ? "text-teal-900" : "text-slate-700"
                        )}>
                          {option.label}
                        </span>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                          isSelected ? "border-teal-500 bg-teal-500" : "border-slate-300"
                        )}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {question.type === "number" && (
              <div className="max-w-xs mx-auto">
                <div className="relative">
                  <input
                    type="number"
                    value={(answers[question.field as keyof QuestionnaireData] as number) || ""}
                    onChange={(e) => handleAnswer(question.field, Number.parseFloat(e.target.value))}
                    placeholder="0"
                    className="w-full text-center text-4xl font-bold text-slate-900 p-6 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none transition-all placeholder:text-slate-300"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium text-lg">
                      {question.placeholder?.replace('Enter value...', '')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {question.type === "checkbox" && question.checkboxes && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.checkboxes.map((checkbox) => {
                  const isChecked = !!answers[checkbox.field as keyof QuestionnaireData]
                  return (
                    <label
                      key={checkbox.field}
                      className={cn(
                        "flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none",
                        isChecked
                          ? "border-teal-500 bg-teal-50/50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-teal-200 hover:bg-slate-50"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded border-2 mr-4 flex items-center justify-center transition-colors",
                        isChecked ? "bg-teal-500 border-teal-500" : "border-slate-300 bg-white"
                      )}>
                        {isChecked && <X className="w-3 h-3 text-white" strokeWidth={4} />}
                      </div>
                      <span className={cn(
                        "text-lg font-medium",
                        isChecked ? "text-teal-900" : "text-slate-700"
                      )}>
                        {checkbox.label}
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleAnswer(checkbox.field, e.target.checked)}
                        className="sr-only"
                      />
                    </label>
                  )
                })}
              </div>
            )}
          </div>

          {/* Validated Error */}
          {error && (
            <div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg animate-shake">
              <X className="w-4 h-4" />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-white border-t border-slate-100 p-4 md:p-6 sticky bottom-0 z-10">
        <div className="max-w-xl mx-auto flex justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="ghost"
            size="lg"
            className="flex-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Retour
          </Button>
          <Button
            onClick={handleNext}
            size="lg"
            className="flex-[2] bg-teal-600 hover:bg-teal-700 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            {currentQuestion === questions.length - 1 ? "Voir les résultats" : "Continuer"}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
