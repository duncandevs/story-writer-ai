// pages/api/together-chat-stream.js
import { createChatCompletionStream } from '@/lib/together/createChatCompletionStream';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, options } = await request.json();

    // Initialize the stream
    const tokenStream = createChatCompletionStream([message], options);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const token of tokenStream) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(token)}\n\n`));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // Return the streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching data from Together API' },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: 'Only POST method is supported on this endpoint' },
    { status: 405 }
  );
}
