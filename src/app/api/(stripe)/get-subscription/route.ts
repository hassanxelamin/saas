import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/database';

export async function POST(request: Request) {
  try {
    const { clerkSessionId } = await request.json();
    const user = await prisma.user.findFirst({
      where: { clerkUserId: clerkSessionId },
    });

    if (!user || !user.customerId) {
      // No customer associated with this user, therefore no subscription.
      return NextResponse.json({ subscription: null });
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        AND: [
          { customerId: user.customerId },
          { status: { in: ['active', 'trialing'] } },
        ],
      },
      include: {
        customer: true,
        price: true,
      },
    });

    return NextResponse.json({ subscription });
  } catch (err: any) {
    console.error(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
