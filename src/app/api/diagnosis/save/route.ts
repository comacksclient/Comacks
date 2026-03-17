import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateDiagnosis, DiagnosisInput } from '@/lib/diagnosisEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { input: inputData, user: userData, existingInputId } = body;

    if (!inputData || !inputData.country) {
      return NextResponse.json({ error: 'Invalid inputs' }, { status: 400 });
    }

    const results = calculateDiagnosis(inputData);

    let savedUserId = null;

    if (userData && userData.name && userData.clinic_name) {
      const savedUser = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          clinic_name: userData.clinic_name,
          city: userData.city || '',
          country: inputData.country,
        }
      });
      savedUserId = savedUser.id;
    }

    // If we already saved this diagnosis earlier (anonymous save) and now just adding user
    if (existingInputId && savedUserId) {
      await prisma.diagnosisInput.update({
        where: { id: existingInputId },
        data: { user_id: savedUserId }
      });
      return NextResponse.json({ success: true });
    }

    // Attempt to save new diagnosis input & results
    const savedInput = await prisma.diagnosisInput.create({
      data: {
        user_id: savedUserId,
        country: inputData.country,
        monthly_inquiries: inputData.monthlyInquiries,
        monthly_consultations: inputData.monthlyConsultations,
        treatments_started: inputData.treatmentsStarted,
        treatments_completed: inputData.treatmentsCompleted,
        average_case_value: inputData.averageCaseValue || results.caseValue,
        patients_last_year: inputData.patientsLastYear,
        patients_returned: inputData.patientsReturned,
        result: {
          create: {
            consult_rate: results.rates.consultRate,
            treatment_rate: results.rates.treatmentRate,
            completion_rate: results.rates.completionRate,
            recall_rate: results.rates.recallRate,
            score: results.score,
            lead_leak: results.leaks.leadLeak,
            conversion_leak: results.leaks.conversionLeak,
            completion_leak: results.leaks.completionLeak,
            recall_leak: results.leaks.recallLeak,
            lost_patients: results.lostPatients,
            monthly_loss: results.revenue.monthlyLoss,
            annual_loss: results.revenue.annualLoss,
            current_revenue: results.revenue.currentRevenue,
            potential_revenue_min: results.revenue.potentialRevenueMin,
            potential_revenue_max: results.revenue.potentialRevenueMax,
            recovery_min: results.revenue.recoveryMin,
            recovery_max: results.revenue.recoveryMax,
          }
        }
      },
      include: {
        result: true
      }
    });

    return NextResponse.json({
      success: true,
      data: results,
      inputId: savedInput.id,
      resultId: savedInput.result?.id,
      userId: savedUserId
    });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Failed to save diagnosis' }, { status: 500 });
  }
}
