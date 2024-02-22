import Image from "next/image";
import KurtaCollections from "./components/KurtaCollections";

export default function Home() {
  return (
    <>

      <div className=" text-center w-full mt-5 ">

      
       <a className=" inline-block " href="">
          <Image src='/zolalogo.png' width={120} height={30} ></Image>
      </a> 
      </div>

      <KurtaCollections></KurtaCollections>
    </>
  );
}
