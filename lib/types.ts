export interface QuestionnaireData {
  age: number
  hasFever: boolean
  temperature: number
  troubleConsciousness: boolean
  convulsions: boolean
  severeAnemia: boolean
  respiratoryDistress: boolean
  jaundice: boolean
  hemoglobinuria: boolean
  hasParasitemia: boolean
  parasitemiaLevel?: number
}

export interface ResultData {
  score: number
  riskLevel: "FAIBLE" | "MODÉRÉ" | "ÉLEVÉ" | "TRÈS ÉLEVÉ"
  riskColor: string
  recommendation: string
  criteres: string[]
  severeCriteriaCount: number
}

export interface Question {
  id: number
  field: string
  question: string
  icon: string
  type: "radio" | "number" | "checkbox"
  required: boolean
  helpText?: string
  placeholder?: string
  options?: Array<{ label: string; value: any }>
  checkboxes?: Array<{ label: string; field: string }>
}
