import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Layout({
  logo,
  nav,
  profile,
  actions,
}: {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  profile?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <header className="w-[100%]">
      <div className="flex justify-around items-center w-[90%] max-w-[1440px] mx-auto text-[#3E236C]">
        <div className="md:hidden mr-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="pb-5 mb-5">{logo}</SheetHeader>
              {nav}
            </SheetContent>
          </Sheet>
        </div>

        <div className="mr-4 hidden md:flex">{logo}</div>
        <div className="items-center flex-1 flex">
          <div className="hidden md:flex">{nav}</div>
          <div className="flex flex-1 items-center justify-end space-x-3">
            {actions}
            {profile}
          </div>
        </div>
      </div>
    </header>
  );
}
