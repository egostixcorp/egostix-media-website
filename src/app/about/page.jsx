import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full mt-20  h-full flex items-center justify-center ">
        <div id="titas" className="w-full rede h-full overflow-hidden">
          <Image
            src={"/arun.png"}
            alt=""
            width={1000}
            height={1000}
            className="size-full object-cover"
          />
        </div>
        <div className="absolute ">
          <h1 className="laptop:text-6xl text-4xl font-bold">
            We&apos;re <span className="text-blue-600">Egostix.</span>
          </h1>
        </div>
        <div id="arun" className="w-full reed h-full overflow-hidden">
          <Image
            src={"/titas.png"}
            alt=""
            width={1000}
            height={1000}
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
