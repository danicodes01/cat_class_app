import prisma from '$lib/prisma';

export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');

    if (!session) {
        // if there is no session load page as normal
        return await resolve(event)
      }

    const user = await prisma.user.findUnique({
        where: { userAuthToken: session },
        select: {username: true, role: true},
    });

    if (user) {
        event.locals.user = {
            name: user.username,
            role: user.role.name,
        }
    }
    return await resolve(event);
};

// import { getSession } from '$lib/session';
// import prisma from '$lib/prisma';

// export const handle = async ({ event, resolve }) => {
//     const session = await getSession(event);

//     event.locals.user = session?.user || null;

//     if (event.locals.user && event.locals.user.name) {
//         console.log(`User ${event.locals.user.name} is making a request`);
//     }

//     const response = await resolve(event);
//     return response;
// };