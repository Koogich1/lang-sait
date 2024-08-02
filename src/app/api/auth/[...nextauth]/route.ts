import NextAuth from "next-auth"

export { GET, POST } from "@/auth"

export default NextAuth({
	providers:[

	],
	trustHost: true
})