import { type NextRequest } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { handle, niche, description, gender } = body ?? {};

  if (!handle || !niche || !description || !gender) {
    return Response.json(
      { error: 'handle, niche, description, and gender are required' },
      { status: 400 }
    );
  }

  try {
    const client = new OpenAI();

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You generate image generation prompts for AI avatar systems. Return valid JSON only, no markdown. Schema: {"avatar_prompt": string, "profile_pic_prompt": string}',
        },
        {
          role: 'user',
          content: `Handle: ${handle}\nNiche: ${niche}\nGender: ${gender}\nPersona: ${description}\n\nGenerate:\n1. avatar_prompt — portrait headshot for a ${gender} creator in ${niche}. Realistic face, neutral background, direct camera gaze, natural lighting, expressive eyes.\n2. profile_pic_prompt — square social profile photo for same persona. More polished/branded. Confident pose, clean background.`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content ?? '';
    const parsed = JSON.parse(content) as { avatar_prompt: string; profile_pic_prompt: string };

    return Response.json(
      { avatar_prompt: parsed.avatar_prompt, profile_pic_prompt: parsed.profile_pic_prompt },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
