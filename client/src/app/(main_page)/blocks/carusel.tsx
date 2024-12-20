import SimpleSwiper from "./elements/carus";
import NotSwiper from "./elements/NotSwiper";

const CaruselBlock = () => {
  return (
    <div className="w-[100%] text-[#6a49aa]">
      <h1 className=" text-3xl lg:text-4xl font-bold text-[#6a49aa] pt-8 text-center mt-[3rem] md:mt-[6%]">
        Уроки для всех возрастов
      </h1>
      <div className="hidden md:block">
        <SimpleSwiper />
      </div>
      <div className="md:hidden">
        <NotSwiper />
      </div>
    </div>
  );
};

export default CaruselBlock;
