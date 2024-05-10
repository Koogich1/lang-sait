import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/src/auth"

const Settings = async () => {
	const session = await auth();
	
	return (
		<div>
			{JSON.stringify(session)}
			<form action={async()=> {
				"use server";

				await signOut();
			}}>
				<Button>
					Sign out
				</Button>
			</form>
		</div>
	)
}

export default Settings