import { AuroraText } from "../../magicui/aurora-text"
 
 const   GetAuroraText = ({first,second,size}) => {
  return (
    <h1 className={`text-4xl font-bold md:text-2xl lg:${size}`}>
      {first} <AuroraText>{second}</AuroraText>
    </h1>
  );
}


export  default GetAuroraText ;