import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  // Redirect user if logged in
  if (locals.user) {
    throw redirect(302, '/');
  }
};

const register: Action = async ({ request }) => {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');

  if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
    return fail(400, { invalid: true });
  }

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return fail(400, { user: true });
  }

  // Directly assign the role with ID 2
  await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { id: 2 } }, // Assign the 'USER' role by ID
    },
  });

  throw redirect(303, '/login');
};

export const actions: Actions = { register };
