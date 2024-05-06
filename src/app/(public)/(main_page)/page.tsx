import StartBlock from "./blocks/StartBlock";
import CaruselBlock from "./blocks/carusel";
import Courses from "./blocks/courses";
import Footer from "./footer";
import Programs from "./blocks/programs";
import Teachers from "./blocks/teachers";

export default function Home() {
  return (
    <>
      <div className="flex justify-around items-center w-[90%] max-w-[1440px] mx-auto text-[#3E236C] flex-col">
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
