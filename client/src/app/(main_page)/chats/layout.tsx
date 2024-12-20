type Props = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full m-3 z-[100]">
      <main className="flex-1 flex flex-col items-center w-[100%] max-w-[1440px] mt-[20] mx-auto overflow-hidden">
        {children}
      </main>
    </div>
  );
};
export default ChatLayout;
