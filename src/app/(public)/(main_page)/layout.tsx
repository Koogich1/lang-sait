import { AppHeader } from "@/src/widgets/app-header/app-header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-[#EFEEF3]">
      <main className="flex-1 flex flex-col items-center w-[100%] max-w-[1680px] mx-auto overflow-hidden">
        <AppHeader variant="public" />
        {children}
      </main>
    </div>
  );
};
export default MainLayout;
