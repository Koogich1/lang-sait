import SimpleSwiper from "./elements/carus";

const CaruselBlock = () => {
  return (
    <div className="w-[100%]">
      <h1 className="font-bold text-4xl mt-[100px] align-middle flex justify-center">
        Уроки для всех возрастов
      </h1>
      <SimpleSwiper />
    </div>
  );
};

export default CaruselBlock;
