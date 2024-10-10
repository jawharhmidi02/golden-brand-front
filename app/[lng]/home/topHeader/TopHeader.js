import Image from "next/image";

import "./TopHeader.css";

const TopHeader = () => {
  return (
    <div className="top-header">
      <div className="left">
        <div
          className="phone"
          onClick={() => {
            window.open("tel:+974 7748 0070");
          }}
        >
          <i className="fa-solid fa-phone"></i>
          <abbr title="Phone Number">+974 7748 0070</abbr>
        </div>
        <div
          className="mail"
          onClick={() => {
            window.open("mailto:info@goldendesign.online");
          }}
        >
          <i className="fa-regular fa-envelope"></i>
          <abbr title="E-mail">info@goldendesign.online</abbr>
        </div>
        <div className="location">
          <i className="fa-solid fa-location-dot"></i>
          <label htmlFor="openLocation">
            Show Location
            <i className="fa-solid fa-angle-down" id="openLocation"></i>
          </label>
        </div>
      </div>
      <div className="middle">
        {/* <div className="open">
          <i className="fa-regular fa-face-grin-beam"></i>
          Open 24/7
        </div> */}
      </div>
      <div className="right">
        <div className="socials">
          <abbr title="Facebook">
            <i
              className="fa-brands fa-facebook"
              onClick={() => {
                window.open(
                  "https://www.facebook.com/profile.php?id=100090249531663"
                );
              }}
            ></i>
          </abbr>
          <abbr title="Instagram">
            <i
              className="fa-brands fa-instagram"
              onClick={() => {
                window.open(
                  "https://www.instagram.com/goldenbrand_stainlesssteel/"
                );
              }}
            ></i>
          </abbr>
          <abbr title="Whatsapp">
            <i
              className="fa-brands fa-whatsapp"
              onClick={() => {
                window.open("https://wa.me/97477480070");
              }}
            ></i>
          </abbr>
        </div>
        <div className="contact-us">Contact Us</div>
        <div className="language">
          <abbr title="Change to Arabic">العربية</abbr>
          <Image src="/images/arabic-language.png" width={20} height={20} alt="arabic"/>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
