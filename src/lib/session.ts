import prisma from '$lib/prisma';

export const getSession = async (event) => {
    const sessionToken = event.cookies.get('session');

    if (!sessionToken) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { userAuthToken: sessionToken },
    });

    if (!user) {
        return null;
    }

    return { user };
};
