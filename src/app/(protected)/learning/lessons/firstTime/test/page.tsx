"use client"

import { Button } from "@/components/ui/button";
import CreateConversation from "./createConversation";



const Page = () => {

  const onCLick = () => {
    const createConversation = CreateConversation()
    return createConversation
  }

  return (
    <div>
      <Button onClick={onCLick}>
        типо создаю
      </Button>
    </div>
  );
};

export default Page;