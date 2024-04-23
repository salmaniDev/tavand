import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

// images
import companyImage from "../../assets/images/Companey.jpg";

// styles
import "../../assets/sass/components/public/nvabar.scss";

// api
import { getMoadi } from "../../services/api";

const titles = [
  {
    name: "صورتحساب ها",
    href: "/",
  },
  {
    name: "کالا و خدمات",
    href: "/services",
  },
  {
    name: "مشتریان",
    href: "/customers",
  },
];

function Navbar({ setDefaultMoadi }) {
  const [activeTab, setActiveTab] = useState(0);
  const [lineStyle, setLineStyle] = useState({
    left: 0,
    width: 0,
  });
  const [moadi, setMoadi] = useState({});

  const titlesRef = titles.map(() => useRef());
  // const moadisRef = Object.keys(moadi).length !== 0 && moadi.map(() => useRef())

  const handleClick = (e, index) => {
    setActiveTab(index);

    setLineStyle({
      left: e.target.offsetLeft,
      width: e.target.offsetWidth,
    });
  };

  useEffect(() => {
    setLineStyle({
      left: titlesRef[0].current.offsetLeft,
      width: titlesRef[0].current.offsetWidth,
    });

    // moadisRef[0].current.className.add('active')

    const fetchMoadi = async () => {
      const res = await getMoadi();
      setMoadi(res.data);
      setDefaultMoadi(res.data[0]);
    };
    fetchMoadi();
  }, []);

  const moadiHandler = (item) => {
    setDefaultMoadi(item);
  };

  const logoutHandler = () => {};

  return (
    <nav className="navbar">
      <div className="companey">
        <div className="current">
          <div className="logo"></div>
          <div className="info">
            <p className="name">راهبرد هوشمند شهر</p>
            <p className="manegment">مدیریت مودیان</p>
          </div>
          <i className="icon icon-Arrow-B"></i>
        </div>
        <div className="option">
          <div className="info">
            <img src={companyImage} className="image" alt="image" />
          </div>
          <div className="list">
            {Object.keys(moadi).length !== 0 &&
              moadi.map((item, index) => (
                <div
                  onClick={() => moadiHandler(item)}
                  key={item.uuid}
                  className={`item`}
                >
                  <i className="icon icon-Arrow-L"></i>
                  <span className="logo"></span>
                  <div className="information">
                    <span className="name">{item.name}</span>
                    <span className="manegment">تغییر مودی</span>
                  </div>
                </div>
              ))}

            {/* <div className='item'>
              <i className='icon icon-Arrow-L'></i>
              <span className='logo'></span>
              <div className='information'>
                <span className='name'>محمد مهدی سلمانی</span>
                <span className='manegment'>تغییر مودی</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <ul className="links d-flex">
        {titles.map((item, index) => (
          <li
            ref={titlesRef[index]}
            onClick={(e) => handleClick(e, index)}
            key={index}
          >
            <Link to={item.href}>{item.name}</Link>
          </li>
        ))}
        <span style={lineStyle} className="line"></span>
      </ul>
      <div className="manegmant">
        <div className="user">
          <i className="icon icon-Profile"></i>
          <p className="name">admin</p>
        </div>
        <i onClick={logoutHandler} className="icon icon-Power-button"></i>
      </div>
    </nav>
  );
}

export default Navbar;
