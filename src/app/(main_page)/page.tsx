import StartBlock from "./blocks/StartBlock";
import CaruselBlock from "./blocks/carusel";
import Courses from "./blocks/courses";
import Footer from "./footer";
import Programs from "./blocks/programs";
import Teachers from "./blocks/teachers";
import MainHeader from "./header";

export default function Home() {
  return (
    <>
    <MainHeader />
      <div className="flex justify-around items-center w-full max-w-[1440px] px-[5%] mx-auto text-[#3E236C] flex-col m-0">
        <StartBlock />
        <Courses />
        <CaruselBlock />
        <Programs />
        <Teachers />
      </div>
      <Footer />
    </>
  );
}
