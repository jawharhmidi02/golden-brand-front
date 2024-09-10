import Image from "next/image";
import "./Nav.css";

const Nav = () => {
  return (
    <nav>
      <div className="left">
        <Image
          src="/images/icon.png"
          width={200}
          height={200}
          alt="icon"
          loading="lazy"
          onClick={()=>{window.location.href = "./"}}
        />
      </div>
      <div className="middle">
        <input type="text" placeholder="Search" />
        <div className="select-category">
          Select Category <i className="fa-solid fa-chevron-down"></i>
        </div>
        <button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="right">
        <div className="login">
          <i className="fa-regular fa-user"></i>Sign Up/Sign In
        </div>
        <div className="cart">
          <span className="material-symbols-outlined">shopping_bag</span>
          <div className="total-number">0</div>
        </div>
      </div>

      <div className="hamburger" />
    </nav>
  );
};

export default Nav;
