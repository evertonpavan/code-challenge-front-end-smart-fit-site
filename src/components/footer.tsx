import Image from "next/image";
import { Separator } from "./ui/separator";

export function Footer() {

  return (
    <div className="w-full">
      <div className="bg-smartfit-darkGrey py-10 items-center flex flex-col space-y-4 pb-20">
        <Image
          className="h-20 w-32"
          src={'/images/logo.svg'}
          width={0}
          height={0}
          alt="logo smartfit"
        />

        <p className="text-white font-medium">
          Todos os direitos reservados - 2020
        </p>
      </div>
      {/* <div className="mt-20 mb-10 flex-col space-y-8 container">
     
      </div> */}
    </div>
  )
}