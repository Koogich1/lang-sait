type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-[#EFEEF3]">
      <main className="flex-1 flex flex-col items-center w-[100%] max-w-[1680px] mx-auto overflow-hidden">
        {children}
      </main>
    </div>
  );
};
export default MainLayout;
