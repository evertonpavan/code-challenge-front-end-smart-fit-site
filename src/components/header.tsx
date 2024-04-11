import Image from "next/image";
import { Separator } from "./ui/separator";

export function Header() {

  return (
    <div className="w-full">
      <div className="bg-foreground py-10 items-center flex flex-col">
        <Image
          className="h-28 w-72 md:w-60"
          src={'/images/logo.svg'}
          width={0}
          height={0}
          alt="logo smartfit"
        />
      </div>
      <div className="w-[100vw] mt-20 mb-10 flex-col space-y-8 container md:max-w-[1280px]">
        <div className="font-extrabold text-5xl text-smartfit-darkGrey leading-[3.5rem]">
          <h1 className="">REABERTURA</h1>
          <h1>SMART FIT</h1>
        </div>

        <div className="w-36 md:w-28 h-4 bg-smartfit-darkGrey">
        <Separator />
        </div>
        
        <p className="pt-6 text-black text-[18px] md:text:xl">
          O horário de funcionamento das nossas unidades está seguindo os decretos de cada município.
          Por isso, confira aqui se a sua unidade está aberta e as medidas de segurança que estamos seguindo.
        </p>
      </div>
    </div>
  )
}