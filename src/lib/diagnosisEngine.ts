// src/lib/diagnosisEngine.ts

export interface DiagnosisInput {
  country: string;
  monthlyInquiries: number;
  monthlyConsultations: number;
  treatmentsStarted: number;
  treatmentsCompleted: number;
  averageCaseValue?: number; // Optional, will use country default if not provided
  patientsLastYear: number;
  patientsReturned: number;
}

export interface CountryConfig {
  country: string;
  currency: string;
  caseValueDefault: number;
  inquiriesAvg: number;
}

export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  india: { country: "India", currency: "₹", caseValueDefault: 8000, inquiriesAvg: 40 },
  usa: { country: "USA", currency: "$", caseValueDefault: 400, inquiriesAvg: 100 },
  uk: { country: "UK", currency: "£", caseValueDefault: 350, inquiriesAvg: 80 },
  australia: { country: "Australia", currency: "AUD", caseValueDefault: 700, inquiriesAvg: 80 },
  uae: { country: "UAE", currency: "AED", caseValueDefault: 1200, inquiriesAvg: 60 },
  singapore: { country: "Singapore", currency: "SGD", caseValueDefault: 1500, inquiriesAvg: 60 },
  germany: { country: "Germany", currency: "€", caseValueDefault: 400, inquiriesAvg: 60 },
  brazil: { country: "Brazil", currency: "R$", caseValueDefault: 200, inquiriesAvg: 40 },
  "south africa": { country: "South Africa", currency: "$", caseValueDefault: 150, inquiriesAvg: 30 },
};

export const GLOBAL_TARGETS = {
  consultTarget: { min: 0.75, max: 0.85, label: "75–85%" },
  treatmentTarget: { min: 0.70, max: 0.80, label: "70–80%" },
  completionTarget: { min: 0.85, max: 0.95, label: "85%+" }, // Assuming high end
  recallTarget: { min: 0.40, max: 0.50, label: "40–50%" },
};

function getStatusText(score: number): string {
  if (score >= 80) return "Your clinic shows optimal performance across most key metrics.";
  if (score >= 60) return "Your clinic shows moderate performance with room for improvement.";
  if (score >= 40) return "Your clinic shows moderate performance with significant room for improvement.";
  return "Your clinic is severely underperforming standard benchmarks.";
}

function getSeverity(actual: number, targetMin: number): "Optimal" | "Moderate" | "Critical" {
  if (actual >= targetMin) return "Optimal";
  if (actual >= targetMin * 0.8) return "Moderate";
  return "Critical";
}

export function calculateDiagnosis(input: DiagnosisInput) {
  const countryKey = input.country.toLowerCase();
  const config = COUNTRY_CONFIGS[countryKey] || COUNTRY_CONFIGS["india"]; // Default to India if missing

  const caseValue = input.averageCaseValue || config.caseValueDefault;

  // Actual Rates
  // Estimate retention metrics if not provided (Dynamic Scaling)
  let patientsLastYear = input.patientsLastYear;
  let patientsReturned = input.patientsReturned;
  
  if (patientsLastYear === 0) {
    // Heuristic: Active base is roughly 15x-20x the monthly completions (1.5 year window)
    patientsLastYear = input.treatmentsCompleted * 18;
    // Industry average return rate (estimated lower for growth gap identification)
    patientsReturned = Math.round(patientsLastYear * 0.32);
  }

  const consultRate = input.monthlyInquiries > 0 ? input.monthlyConsultations / input.monthlyInquiries : 0;
  const treatmentRate = input.monthlyConsultations > 0 ? input.treatmentsStarted / input.monthlyConsultations : 0;
  const completionRate = input.treatmentsStarted > 0 ? input.treatmentsCompleted / input.treatmentsStarted : 0;
  const recallRate = patientsLastYear > 0 ? patientsReturned / patientsLastYear : 0;

  // Expected Pipeline (Using minimum thresholds for conservative calculations)
  const expectedConsult = input.monthlyInquiries * GLOBAL_TARGETS.consultTarget.min;
  const expectedTreatment = input.monthlyConsultations * GLOBAL_TARGETS.treatmentTarget.min;
  const expectedCompletion = input.treatmentsStarted * GLOBAL_TARGETS.completionTarget.min;
  const expectedRecall = patientsLastYear * GLOBAL_TARGETS.recallTarget.min;

  // Exact patient drop-offs (Leaks)
  const leadLeak = Math.max(0, input.monthlyInquiries - input.monthlyConsultations);
  const conversionLeak = Math.max(0, input.monthlyConsultations - input.treatmentsStarted);
  const completionLeak = Math.max(0, input.treatmentsStarted - input.treatmentsCompleted);
  const recallLeakAnnual = Math.max(0, patientsLastYear - patientsReturned); // Approximate annual
  const recallLeakMonthly = Math.round(recallLeakAnnual / 12);
  const lostPatients = Math.round(leadLeak + conversionLeak + completionLeak + recallLeakMonthly); // All raw lost patients 

  // Potential Revenue (Expected path based on target ranges)
  const potentialCompletedMin = Math.max(input.treatmentsCompleted, input.monthlyInquiries * 
    GLOBAL_TARGETS.consultTarget.min * 
    GLOBAL_TARGETS.treatmentTarget.min * 
    GLOBAL_TARGETS.completionTarget.min);
    
  const potentialCompletedMax = Math.max(input.treatmentsCompleted, input.monthlyInquiries * 
    GLOBAL_TARGETS.consultTarget.max * 
    GLOBAL_TARGETS.treatmentTarget.max * 
    GLOBAL_TARGETS.completionTarget.max);
    
  const currentRevenue = input.treatmentsCompleted * caseValue;
  const potentialRevenueMin = Math.round(potentialCompletedMin * caseValue);
  const potentialRevenueMax = Math.round(potentialCompletedMax * caseValue);
  const recoveryMin = Math.max(0, potentialRevenueMin - currentRevenue);
  const recoveryMax = Math.max(0, potentialRevenueMax - currentRevenue);

  // Recall Recovery
  const recallRecoveryMin = Math.max(0, (input.patientsLastYear * GLOBAL_TARGETS.recallTarget.min) - input.patientsReturned) * caseValue;
  const recallRecoveryMax = Math.max(0, (input.patientsLastYear * GLOBAL_TARGETS.recallTarget.max) - input.patientsReturned) * caseValue;

  // Use the realistic recovery minimums as the definitive "Loss" (Capital left on the table below benchmarks)
  const monthlyLoss = Math.round(recoveryMin + (recallRecoveryMin / 12));
  const annualLoss = monthlyLoss * 12;

  // Score (0-100) - Weighted strongly by total funnel efficiency to stop high bottom-funnel rates from masking top-funnel completely
  const coreFunnelTarget = GLOBAL_TARGETS.consultTarget.min * GLOBAL_TARGETS.treatmentTarget.min * GLOBAL_TARGETS.completionTarget.min;
  const coreFunnelActual = input.monthlyInquiries > 0 ? input.treatmentsCompleted / input.monthlyInquiries : 0;
  
  const funnelScorePercentage = Math.min(1, coreFunnelActual / coreFunnelTarget);
  const recallScorePercentage = Math.min(1, recallRate / GLOBAL_TARGETS.recallTarget.min);

  let rawScore = (funnelScorePercentage * 70) + (recallScorePercentage * 30);
  
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));
  const scoreText = getStatusText(score);

  // Severities
  const severities = {
    consult: getSeverity(consultRate, GLOBAL_TARGETS.consultTarget.min),
    treatment: getSeverity(treatmentRate, GLOBAL_TARGETS.treatmentTarget.min),
    completion: getSeverity(completionRate, GLOBAL_TARGETS.completionTarget.min),
    recall: getSeverity(recallRate, GLOBAL_TARGETS.recallTarget.min),
  };

  // System Recommendations
  const systems = [];
  if (consultRate < GLOBAL_TARGETS.consultTarget.min) systems.push("Inquiry System");
  if (treatmentRate < GLOBAL_TARGETS.treatmentTarget.min) systems.push("Conversion System");
  if (completionRate < GLOBAL_TARGETS.completionTarget.min) systems.push("Completion System");
  if (recallRate < GLOBAL_TARGETS.recallTarget.min) systems.push("Recall System");
  systems.push("Analytics System"); // Always show analytics system

  return {
    config,
    caseValue,
    rates: { consultRate, treatmentRate, completionRate, recallRate },
    severities,
    leaks: { leadLeak, conversionLeak, completionLeak, recallLeak: recallLeakAnnual },
    lostPatients,
    revenue: { currentRevenue, monthlyLoss, annualLoss, potentialRevenueMin, potentialRevenueMax, recoveryMin, recoveryMax },
    score,
    scoreText,
    systems
  };
}
