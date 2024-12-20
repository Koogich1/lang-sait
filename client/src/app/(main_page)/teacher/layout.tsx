import HeaderTeacher from "./header";

type Props = {
  children: React.ReactNode;
};

const teacherLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-[#EFEEF3] w-full">
			<HeaderTeacher />
      <main className="flex-1 flex flex-col items-center w-[100%] max-w-[1440px] px-[5%] mx-auto overflow-hidden pb-10">
        {children}
      </main>
    </div>
  );
};
export default teacherLayout;
