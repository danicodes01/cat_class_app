// src/routes/api/plans.ts
import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  try {
    const plans = await prisma.lessonPlan.findMany({
      include: {
        features: {
          include: {
            feature: true,
          },
        },
      },
    });
    return json(plans, { status: 200 });
  } catch (error) {
    return json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
};
