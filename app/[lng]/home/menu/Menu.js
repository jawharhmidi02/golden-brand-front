import "./Menu.css";

const Menu = ({ lng }) => {
  return (
    <div className="menu-container">
      <div className="menu">
        <div className="link active">
          <a href="#">Home</a>
        </div>
        <div className="link">
          <a href="#">Our Services</a>
        </div>
        <div className="link">
          <a href="#">Products</a>
        </div>
        <div className="link">
          <a href="#">Blog</a>
        </div>
        <div className="link">
          <a href="#">About</a>
        </div>
        <div className="link">
          <a href="#">Contact</a>
        </div>
      </div>
      {/* <div className="lang">
        {lng !== "en" ? (
          <a href="#">
            <abbr title="Change to English">English</abbr>
          </a>
        ) : (
          <a href="#">
            <abbr title="Change to Arabic">العربية</abbr>
          </a>
        )}
      </div> */}
    </div>
  );
};

export default Menu;
