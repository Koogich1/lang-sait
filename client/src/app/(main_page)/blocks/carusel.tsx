import SimpleSwiper from "./elements/carus";
import NotSwiper from "./elements/NotSwiper";

const CaruselBlock = () => {
  return (
    <div className="w-[100%] text-[#6a49aa]">
      <h1 className="font-bold text-4xl mt-[100px] align-middle flex text-center justify-center text-[#6a49aa]">
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
