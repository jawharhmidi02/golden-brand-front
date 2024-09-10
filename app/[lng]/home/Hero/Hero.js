import Image from "next/image";

import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <Image src="/images/hero5.jpeg" width={500} height={500} />
      <Image src="/images/hero4.jpeg" width={500} height={500} />
      <Image src="/images/hero3.jpeg" width={500} height={500} />
    </div>
  );
};

export default Hero;
