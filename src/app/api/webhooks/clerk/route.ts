import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { prisma } from '@/src/lib/database';

type EventType = 'user.created' | 'user.updated' | '*';

type EmailAddress = {
  email_address: string;
};

type Data = {
  id: string;
  email_addresses: EmailAddress[];
};

type Event = {
  data: Data;
  object: 'event';
  type: EventType;
};

const webhookSecret = process.env.WEBHOOK_SECRET || '';

async function handler(request: Request) {
  try {
    const payload = await request.json();
    const headersList = request.headers;
    const heads = {
      'svix-id': headersList.get('svix-id'),
      'svix-timestamp': headersList.get('svix-timestamp'),
      'svix-signature': headersList.get('svix-signature'),
    };

    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;

    try {
      evt = wh.verify(
        JSON.stringify(payload),
        heads as IncomingHttpHeaders & WebhookRequiredHeaders
      ) as Event;
    } catch (err) {
      console.error(`Verification error: ${(err as Error).message}`);
      console.error(err);
      return NextResponse.json({}, { status: 400 });
    }

    const eventType: EventType = evt.type;
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id } = evt.data;
      const emailAddress = evt.data.email_addresses[0].email_address;

      await prisma.user.upsert({
        where: { clerkUserId: id as string },
        update: { email: emailAddress },
        create: {
          clerkUserId: id as string,
          email: emailAddress,
        },
      });

      // if (eventType === 'user.created') {
      //   await createOrRetrieveCustomer({
      //     email: emailAddress,
      //     clerkUserId: id,
      //   });
      // }
    }

    return NextResponse.json(
      { message: 'Handled successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error(`Unexpected error: ${err}`);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
