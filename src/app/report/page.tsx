export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { calculateDiagnosis, COUNTRY_CONFIGS, GLOBAL_TARGETS, DiagnosisInput } from "@/lib/diagnosisEngine";
import { Activity, Printer, Terminal, ShieldCheck, AlertTriangle, Cpu, ScanLine, Zap } from "lucide-react";
import { PrintButton } from "./print-button";
import Link from "next/link";

export default async function ReportPage(props: { searchParams: Promise<{ id?: string }> }) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id;

  let result: any = null;
  let user: any = null;
  let input: any = null;

  if (id) {
    result = await prisma.diagnosisResult.findUnique({
      where: { id },
      include: { input: { include: { user: true } } }
    });
    if (result) {
      input = result.input;
      user = input.user;
    }
  }


  if (!result) {
    input = {
      country: "India",
      monthly_inquiries: 120,
      monthly_consultations: 45,
      treatments_started: 30,
      treatments_completed: 28,
      average_case_value: 8000,
      patients_last_year: 800,
      patients_returned: 250,
    };
    user = {
      clinic_name: "Sample Dental Group",
      city: "Mumbai",
      country: "India"
    };
    result = {
      score: 58,
      consult_rate: 0.375,
      treatment_rate: 0.666,
      completion_rate: 0.933,
      recall_rate: 0.312,
      lead_leak: 15,
      conversion_leak: 2,
      completion_leak: 1,
      recall_leak: 70,
      lost_patients: 88,
      monthly_loss: 88 * 8000,
      annual_loss: 88 * 8000 * 12,
      current_revenue: 28 * 8000,
      potential_revenue: (120 * 0.5 * 0.7 * 0.95) * 8000,
      recovery: ((120 * 0.5 * 0.7 * 0.95) * 8000) - (28 * 8000),
      created_at: new Date()
    };
  }

  const engineInput: DiagnosisInput = {
    country: input.country,
    monthlyInquiries: input.monthly_inquiries,
    monthlyConsultations: input.monthly_consultations,
    treatmentsStarted: input.treatments_started,
    treatmentsCompleted: input.treatments_completed,
    averageCaseValue: input.average_case_value,
    patientsLastYear: input.patients_last_year,
    patientsReturned: input.patients_returned,
  };
  const computedResult = calculateDiagnosis(engineInput);

  const currency = COUNTRY_CONFIGS[input!.country.toLowerCase()]?.currency || "$";


  const systems = [];

  if (computedResult.rates.consultRate < GLOBAL_TARGETS.consultTarget.min)
    systems.push({
      name: "Getting More Patients to Book",
      desc: "Many people are enquiring but not booking appointments. We help you respond faster and guide them to book easily."
    });

  if (computedResult.rates.treatmentRate < GLOBAL_TARGETS.treatmentTarget.min)
    systems.push({
      name: "Turning Visits into Treatments",
      desc: "Patients are visiting but not going ahead with treatment. We help them understand and feel confident to say yes."
    });

  if (computedResult.rates.completionRate < GLOBAL_TARGETS.completionTarget.min)
    systems.push({
      name: "Completing Treatments",
      desc: "Some patients are not finishing their treatment. We help you keep them on track until completion."
    });

  if (computedResult.rates.recallRate < GLOBAL_TARGETS.recallTarget.min)
    systems.push({
      name: "Bringing Patients Back",
      desc: "Many past patients are not returning. We help remind and reconnect with them for checkups and further care."
    });

  systems.push({
    name: "Clinic Growth Overview",
    desc: "A simple view to help you understand how your clinic is performing and where you can improve."
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans pb-20 selection:bg-red-900/30">

      {/* --- WEB VIEWER TOP BANNER (Hidden on Print) --- */}
      <div className="container mx-auto max-w-[210mm] mt-28 sticky top-20 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 text-white py-4 px-6 flex justify-between items-center print:hidden shadow-2xl rounded-t-2xl mb-0">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 hidden sm:flex">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-800 border border-white/10"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-800 border border-white/10"></div>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-zinc-500 hidden sm:block" />
            <span className="text-[10px] font-mono font-bold uppercase text-zinc-300 whitespace-nowrap">
              <span className="inline-flex items-center">
                <span className="text-red-500">C</span>oma<span className="text-red-500">c</span>ks OS
              </span> // <span className="hidden xs:inline">Secure Document Viewer</span><span className="xs:hidden">Viewer</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!id && <span className="hidden md:inline-block bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded text-[10px] uppercase tracking-widest font-bold animate-pulse">Demo Mode</span>}
          <PrintButton />
        </div>
      </div>

      {/* --- DOCUMENT CONTAINER --- */}
      <div className="container mx-auto w-full max-w-[210mm] bg-[#080808] border border-white/10 border-t-0 shadow-[0_0_80px_rgba(0,0,0,0.8)] p-0 print:m-0 print:border-none print:shadow-none print:w-full relative rounded-b-2xl print:bg-white print:text-black">

        {/* PAGE 1: OVERVIEW */}
        <div className="min-h-[297mm] p-6 sm:p-12 md:p-16 flex flex-col relative page-break-after overflow-hidden print:p-12 print:border-b print:border-zinc-200">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none print:hidden"></div>

          <Header title="Practice Health Overview" clinic={user} />

          <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10 mt-12">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/10 bg-white/5 print:border-zinc-200 print:bg-transparent">
              <Activity className="w-3.5 h-3.5 text-zinc-400 print:text-zinc-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 print:text-zinc-500 font-bold">Overall System Health</span>
            </div>

            <div className={`w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 flex flex-col items-center justify-center mb-10 sm:16 ${computedResult.score > 80 ? 'border-white/20 print:border-zinc-300' : 'border-red-500/30 bg-red-500/5 shadow-[0_0_50px_rgba(239,68,68,0.1)] print:bg-transparent print:shadow-none print:border-red-500/50'}`}>
              <div className="text-6xl sm:text-8xl font-black text-white print:text-black tracking-tighter">{Math.round(computedResult.score)}</div>
              <div className="text-base sm:text-xl font-mono text-zinc-500 mt-2">/ 100</div>
            </div>

            <div className="w-full bg-[#110505] p-6 sm:p-10 rounded-2xl border border-red-500/20 relative overflow-hidden print:bg-zinc-50 print:border-red-500/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.1)_0,transparent_60%)] print:hidden" />
              <h3 className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 relative z-10 flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Revenue Opportunity Detected
              </h3>
              <div className="text-4xl sm:text-6xl font-mono font-black text-red-500 mb-4 relative z-10 leading-tight">
                {currency} {Math.round(computedResult.revenue.recoveryMax).toLocaleString()} <span className="text-xl sm:text-2xl text-red-500/50">/mo</span>
              </div>
              <div className="text-red-400/80 font-mono text-[10px] sm:text-sm relative z-10 bg-red-500/10 inline-block px-4 py-2 rounded-md border border-red-500/20 print:bg-red-50 print:border-red-100 italic sm:not-italic">Potential Annual Growth: {currency} {Math.round(computedResult.revenue.recoveryMax * 12).toLocaleString()}</div>
            </div>
          </div>

          <Footer page={1} />
        </div>

        {/* PAGE 2: PIPELINE */}
        <div className="h-[296.8mm] p-6 sm:p-12 md:p-16 flex flex-col relative page-break-after border-t border-white/10 print:border-zinc-200 print:p-12 overflow-hidden">
          <Header title="Patient Flow Analysis" clinic={user} />

          <div className="flex-1 flex flex-col justify-center mt-12">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-12 text-center">Patient Flow Analysis</h2>
            <div className="space-y-4 max-w-md mx-auto w-full relative">
              <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 -translate-x-1/2 z-0 print:bg-zinc-200"></div>
              {[
                { label: "Inquiries Captured", val: input.monthly_inquiries },
                { label: "Consultations Booked", val: input.monthly_consultations },
                { label: "Treatments Initiated", val: input.treatments_started },
                { label: "Treatments Completed", val: input.treatments_completed },
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center">
                  <div className="w-full bg-[#111] border border-white/10 p-5 rounded-xl flex justify-between items-center shadow-xl print:bg-zinc-50 print:border-zinc-200 print:shadow-none">
                    <span className="text-xs uppercase tracking-widest font-bold text-zinc-400 print:text-zinc-600">{step.label}</span>
                    <span className="font-mono font-bold text-2xl text-white print:text-black">{step.val}</span>
                  </div>
                  {idx < 3 && <div className="h-6 w-px bg-red-500/50 my-2" />}
                </div>
              ))}
            </div>
          </div>

          <Footer page={2} />
        </div>

        {/* PAGE 3: LEAK ANALYSIS */}
        <div className="min-h-[297mm] p-6 sm:p-12 md:p-16 flex flex-col relative page-break-after border-t border-white/10 print:border-zinc-200 print:p-12">
          <Header title="Growth Opportunities" clinic={user} />

          <div className="flex-1 flex flex-col justify-center gap-6 mt-12">
            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden print:border-zinc-200 print:bg-zinc-100">
              <div className="bg-[#080808] p-6 print:bg-white">
                <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">New Patient Loss</h4>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed">Inquiries lost before booking consultations.</p>
                <div className="text-2xl font-mono text-red-500">-{computedResult.leaks.leadLeak}</div>
              </div>
              <div className="bg-[#080808] p-6 print:bg-white">
                <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">Consultation Gaps</h4>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed">Consultations not moving forward to treatment.</p>
                <div className="text-2xl font-mono text-red-500">-{computedResult.leaks.conversionLeak}</div>
              </div>
              <div className="bg-[#080808] p-6 print:bg-white">
                <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">Incomplete Treatment</h4>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed">Patients starting but not completing active care.</p>
                <div className="text-2xl font-mono text-red-500">-{computedResult.leaks.completionLeak}</div>
              </div>
              <div className="bg-[#080808] p-6 print:bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">Inactive Patients (Annual)</h4>
                  <p className="text-zinc-400 text-xs mb-6 leading-relaxed text-balance">Past patients who haven't returned this year.</p>
                </div>
                <div>
                  <div className="text-2xl font-mono text-red-500 mb-2">-{computedResult.leaks.recallLeak}</div>
                  <p className="text-[9px] text-zinc-500 italic print:text-zinc-400">*Projected value based on current clinical throughput volume.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-red-500/5 border border-red-500/10 rounded-2xl flex justify-between items-center print:bg-zinc-50 print:border-zinc-200">
              <div>
                <h4 className="text-xs text-red-500 font-bold uppercase tracking-widest mb-1">Total Patient Gap</h4>
                <p className="text-zinc-500 text-[10px]">Monthly missed opportunities</p>
              </div>
              <div className="text-4xl font-mono font-black text-red-500">{computedResult.lostPatients}</div>
            </div>
          </div>

          <Footer page={3} />
        </div>

        {/* PAGE 4: BENCHMARK */}
        <div className="min-h-[297mm] p-6 sm:p-12 md:p-16 flex flex-col relative page-break-after border-t border-white/10 print:border-zinc-200 print:p-12">
          <Header title="Growth Benchmarks" clinic={user} />

          <div className="flex-1 flex flex-col justify-center mt-12">
            <div className="w-full bg-[#111] border border-white/5 rounded-2xl overflow-hidden print:bg-white print:border-zinc-200 print:rounded-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10 print:bg-zinc-50 print:border-zinc-200">
                    <th className="p-6 text-zinc-500 uppercase tracking-widest text-[10px] font-bold">System Metric</th>
                    <th className="p-6 text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Actual</th>
                    <th className="p-6 text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Target</th>
                    <th className="p-6 text-zinc-500 uppercase tracking-widest text-[10px] font-bold text-right">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-zinc-200">
                  {[
                    { l: "Consultation Acceptance", y: computedResult.rates.consultRate, t: GLOBAL_TARGETS.consultTarget.min, tStr: GLOBAL_TARGETS.consultTarget.label },
                    { l: "Treatment Acceptance", y: computedResult.rates.treatmentRate, t: GLOBAL_TARGETS.treatmentTarget.min, tStr: GLOBAL_TARGETS.treatmentTarget.label },
                    { l: "Plan Completion", y: computedResult.rates.completionRate, t: GLOBAL_TARGETS.completionTarget.min, tStr: GLOBAL_TARGETS.completionTarget.label },
                    { l: "Patient Reactivation", y: computedResult.rates.recallRate, t: GLOBAL_TARGETS.recallTarget.min, tStr: GLOBAL_TARGETS.recallTarget.label },
                  ].map((b, i) => {
                    const yours = Math.round(b.y * 100);
                    const tgt = Math.round(b.t * 100);
                    const gap = yours - tgt;
                    const isLeak = gap < 0;
                    return (
                      <tr key={i} className="bg-[#0a0a0a] print:bg-white">
                        <td className="p-6 text-xs font-bold uppercase tracking-wider text-zinc-300 print:text-zinc-800">{b.l}</td>
                        <td className="p-6 text-lg font-mono text-white print:text-black">{yours}%</td>
                        <td className="p-6 text-lg font-mono text-zinc-600 print:text-zinc-400">{b.tStr}</td>
                        <td className="p-6 text-right">
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-[10px] font-mono font-bold border ${!isLeak ? 'bg-white/10 border-white/20 text-white print:bg-zinc-100 print:border-zinc-200 print:text-zinc-600' : 'bg-[#1a0505] border-red-500/30 text-red-400 print:bg-red-50 print:border-red-100 print:text-red-700'}`}>
                            {gap > 0 ? '+' : ''}{gap}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <Footer page={4} />
        </div>

        {/* PAGE 5: REVENUE RECOVERY */}
        <div className="min-h-[297mm] p-6 sm:p-12 md:p-16 flex flex-col relative page-break-after border-t border-white/10 print:border-zinc-200 print:p-12">
          <Header title="Revenue Growth Projections" clinic={user} />

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="mb-10">
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">Financial Potential</h2>
              <h3 className="text-2xl text-white print:text-black font-medium tracking-tight">Growth Opportunity</h3>
              <p className="text-zinc-500 text-xs mt-4 leading-relaxed max-w-xl">Mathematical projection of gross revenue if the Comacks Growth System is implemented to bridge critical gaps.</p>
            </div>

            <div className="flex flex-col w-full gap-4 mb-16">
              <div className="bg-[#111] border border-white/5 p-8 rounded-2xl flex justify-between items-center print:bg-white print:border-zinc-200 print:rounded-lg">
                <div className="text-left">
                  <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1 print:text-zinc-400">Current Output</h4>
                  <div className="text-xs text-zinc-600 font-mono">Status Quo</div>
                </div>
                <div className="text-3xl font-mono font-bold text-zinc-400 print:text-zinc-500">{currency} {computedResult.revenue.currentRevenue.toLocaleString()}</div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-center shadow-[0_0_30px_rgba(255,255,255,0.05)] print:bg-zinc-50 print:border-zinc-200 print:shadow-none print:rounded-lg gap-4">
                <div className="text-left shrink-0">
                  <h4 className="text-[10px] text-white print:text-zinc-800 uppercase tracking-widest font-bold mb-1">Future Output <span className="text-zinc-500 print:text-zinc-400 ml-2 font-light lowercase">Top Clinics Goal</span></h4>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-black text-white print:text-black whitespace-nowrap">
                  {computedResult.revenue.recoveryMin === 0 ? (
                    `Up to ${currency} ${Math.round(computedResult.revenue.potentialRevenueMax).toLocaleString()}`
                  ) : (
                    `${currency} ${Math.round(computedResult.revenue.potentialRevenueMin).toLocaleString()} – ${currency} ${Math.round(computedResult.revenue.potentialRevenueMax).toLocaleString()}`
                  )}
                </div>
              </div>
            </div>

            <div className="w-full pt-10 border-t border-white/10 print:border-zinc-200 flex flex-col items-center">
              <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-4">Total Growth Potential</h3>
              <div className="text-xl sm:text-2xl lg:text-4xl font-mono font-black text-white print:text-black mb-2 whitespace-nowrap">
                {computedResult.revenue.recoveryMin === 0 ? (
                  `+ Up to ${currency} ${Math.round(computedResult.revenue.recoveryMax).toLocaleString()}`
                ) : (
                  `+${currency} ${Math.round(computedResult.revenue.recoveryMin).toLocaleString()} – ${currency} ${Math.round(computedResult.revenue.recoveryMax).toLocaleString()}`
                )} <span className="text-lg sm:text-xl text-zinc-600">/mo</span>
              </div>
              <div className="text-sm font-mono text-zinc-500 bg-[#111] px-4 py-2 rounded-md border border-white/5 mt-4 print:bg-zinc-50 print:border-zinc-100 whitespace-nowrap">
                Yearly Projection: {computedResult.revenue.recoveryMin === 0 ? (
                  `+ Up to ${currency} ${Math.round(computedResult.revenue.recoveryMax * 12).toLocaleString()}`
                ) : (
                  `+${currency} ${Math.round(computedResult.revenue.recoveryMin * 12).toLocaleString()} – ${currency} ${Math.round(computedResult.revenue.recoveryMax * 12).toLocaleString()}`
                )}
              </div>
            </div>
          </div>
          <Footer page={5} />
        </div>

        {/* PAGE 6: SYSTEMS & IMPLEMENTATION */}
        <div className="min-h-[297mm] p-6 sm:p-12 md:p-16 flex flex-col relative border-t border-white/10 print:border-zinc-200 print:p-12">


          <div className="flex-1 flex flex-col justify-center gap-12 mt-12">
            <div>
              <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-8">Recommended Practice Systems</h2>
              <div className="grid grid-cols-1 gap-3">
                {systems.map((sys, idx) => (
                  <div key={idx} className="bg-[#111] p-5 rounded-xl border border-white/5 flex items-start gap-4 print:bg-white print:border-zinc-200 print:rounded-none">
                    <div className="w-8 h-8 bg-white/5 border border-white/10 rounded flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 print:border-zinc-300 print:text-zinc-800">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-white print:text-zinc-800 mb-1">{sys.name}</h3>
                      <p className="text-[10px] text-zinc-500 leading-relaxed font-light print:text-zinc-600">
                        {sys.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-6 print:border print:border-zinc-200">
                <ScanLine className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-3xl font-medium tracking-tighter text-white print:text-black mb-4">Book Your Meeting.</h2>
              <p className="text-xs text-zinc-400 print:text-zinc-600 max-w-sm mx-auto mb-8 leading-relaxed font-light">
                Your growth roadmap is ready. The next step is a simple strategy call with our team.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-0 relative z-10 print:hidden">
                <Link href="/contact" className="w-full max-w-sm">
                  <button className="w-full py-4 px-12 rounded-xl bg-white text-black font-bold text-[10px] uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Secure Your Slot
                  </button>
                </Link>
              </div>

              <div className="mt-8 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                Contact: <a href="mailto:arpit@comacks.com" className="text-white print:text-black hover:text-red-500 transition-colors underline">arpit@comacks.com</a>
              </div>
            </div>
          </div>

          <Footer page={6} />
        </div>

      </div>

      {/* --- PRINT STYLES (Enforces high-quality PDF generation) --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          /* ===== PAGE SETUP ===== */
          @page { 
            margin: 0; 
            size: A4 portrait; 
          }

          /* ===== FORCE DESKTOP LAYOUT ON MOBILE ===== */
          html, body { 
            background: white !important; 
            color: black !important;
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
            width: 210mm !important;
            min-width: 210mm !important;
            max-width: 210mm !important;
            font-size: 12px !important;
          }

          /* ===== EACH SECTION = EXACTLY ONE A4 PAGE ===== */
          .page-break-after {
            break-after: page !important;
            page-break-after: always !important;
            height: 297mm !important;
            min-height: unset !important;
            max-height: 297mm !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }

          /* Last page has no break */
          .page-break-after:last-of-type {
            break-after: avoid !important;
            page-break-after: avoid !important;
            height: 297mm !important;
          }

          /* ===== RESET DARK BACKGROUNDS ===== */
          .bg-\\[\\#050505\\], .bg-\\[\\#080808\\], .bg-\\[\\#111\\], .bg-\\[\\#0a0a0a\\], .bg-\\[\\#110505\\],
          .bg-\\[\\#080808\\]\\/90, [class*="bg-zinc-9"], [class*="bg-black"] {
            background-color: white !important;
          }

          /* ===== TEXT COLORS ===== */
          .text-white, .text-zinc-100, .text-zinc-200 { color: #111 !important; }
          .text-zinc-300, .text-zinc-400 { color: #555 !important; }
          .text-zinc-500, .text-zinc-600 { color: #888 !important; }
          .text-red-500 { color: #dc2626 !important; }
          .text-red-400 { color: #ef4444 !important; }
          .text-emerald-400 { color: #059669 !important; }

          /* ===== BORDERS ===== */
          .border-white\\/5, .border-white\\/10, .border-white\\/20 { border-color: #e5e7eb !important; }
          
          /* ===== TAILWIND PRINT: UTILITIES ENFORCEMENT ===== */
          .print\\:bg-white { background-color: white !important; }
          .print\\:bg-zinc-50 { background-color: #f9fafb !important; }
          .print\\:text-black { color: #000 !important; }
          .print\\:text-zinc-800 { color: #1f2937 !important; }
          .print\\:border-zinc-200 { border-color: #e5e7eb !important; }
          .print\\:border-zinc-300 { border-color: #d1d5db !important; }
          .print\\:hidden { display: none !important; }
          .print\\:flex-row { flex-direction: row !important; }
          .print\\:p-12 { padding: 3rem !important; }
          .print\\:p-8 { padding: 2rem !important; }

          /* ===== STRIP DECORATIVE EFFECTS ===== */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            text-shadow: none !important;
            box-shadow: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}} />
    </div>
  );
}

function Header({ title, clinic }: { title: string; clinic: any }) {
  return (
    <div className={`flex justify-between items-start border-b border-white/10 print:border-zinc-300 pb-6 print:pb-4 absolute top-8 sm:top-16 left-6 sm:left-16 right-6 sm:right-16 z-20`}>
      <div>
        <h1 className="text-lg font-black text-white print:text-black flex items-center gap-2 tracking-tight">
          <Activity className="w-5 h-5 text-red-500" />
          <span className="inline-flex items-center whitespace-nowrap">
            <span className="text-red-500">C</span>oma<span className="text-red-500">c</span>ks OS
          </span>
        </h1>
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 print:text-zinc-400 mt-2">Practice Health Report</div>
      </div>
      <div className="text-right">
        <div className={`font-mono text-xs font-bold text-white print:text-zinc-800`}>{clinic?.clinic_name || "Diagnostic Report"}</div>
        <div className={`text-[10px] font-mono text-zinc-500 print:text-zinc-400 mt-2`}>{new Date().toLocaleDateString()}</div>
      </div>
      <div className={`absolute -bottom-6 left-0 font-bold uppercase tracking-[0.2em] text-[10px] text-zinc-400 bg-[#080808] print:bg-white pr-4`}>
        {title}
      </div>
    </div>
  );
}

function Footer({ page }: { page: number }) {
  return (
    <div className={`flex justify-between items-center text-[10px] text-zinc-600 uppercase font-mono font-bold whitespace-nowrap absolute bottom-8 sm:bottom-16 left-6 sm:left-16 right-6 sm:right-16 z-20 border-t border-white/5 print:border-zinc-100 pt-6`}>
      <span className="flex items-center gap-2 whitespace-nowrap">
        <Cpu className="w-3 h-3" />
        Comacks Group
      </span>
      <span>Page 0{page} / 06</span>
    </div>
  );
}