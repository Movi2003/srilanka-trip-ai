import { NextResponse } from 'next/server';

let savedTrips = [
  { id: '1', title: 'Southern Coast Loop', rating: 9.2, stops: 8, distance: 245, img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop' },
  { id: '2', title: 'Hill Country Expedition', rating: 8.7, stops: 5, distance: 180, img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop' },
  { id: '3', title: 'Cultural Triangle Tour', rating: 7.5, stops: 12, distance: 410, img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop' },
];

export async function GET() {
  return NextResponse.json(savedTrips);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newTrip = {
      id: Date.now().toString(),
      ...data
    };
    savedTrips.push(newTrip);
    return NextResponse.json({ success: true, trip: newTrip });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save trip' }, { status: 500 });
  }
}
