/**
 * An array of routes thatare accessible to the public
 * These routes do not require authentication
 */

export const publicRoutes = [
	"/",
	"/auth/new-verification"
]

/**
 * 
 */
export const authRoutes = [
	"/auth/login",
	"/auth/register",
	"/auth/reset",
	"/auth/new-password",
]


export const apiAuthPrefix = "/api/auth/";

export const DEFAULT_LOGIN_REDIRECT = "/profile/user"