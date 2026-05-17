import { NextResponse } from 'next/server';

let savedTrips: any[] = [];

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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
      savedTrips = savedTrips.filter(t => t.id !== id);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'No id provided' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete trip' }, { status: 500 });
  }
}
