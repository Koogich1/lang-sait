import getConversations from "@/actions/getConversations"
import MainHeader from "../../header"
import SideBarConversations from "../components/SideBarConversation"

export default async function ConversationsLayout(
	{children}:{
		children: React.ReactNode
	}) {

	const conversations = await getConversations()
	return(
		<div className='h-full w-full'>
      <MainHeader />
      <div className='w-full flex h-full px-[5%] gap-5 p-5'>
        <SideBarConversations 
					initialItems={conversations}
				/>
        {children}
      </div>
    </div>
	)
}