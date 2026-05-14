// app/trip-planner/page.tsx
// NO 'use client' here – this is a Server Component

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ClientTripPlanner from './ClientTripPlanner';  // ← we'll create this file next

export default async function TripPlannerPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  // If logged in → render the interactive client part
  return <ClientTripPlanner />;
}