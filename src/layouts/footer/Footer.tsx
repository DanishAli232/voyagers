import logo from "./img/logo.png";
import fb from "./img/fb.png";
import insta from "./img/insta.png";
import linkedIn from "./img/linkedln.png";
import tiktok from "./img/tiktok.png";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="page-footer">
      {/* <!-- Footer Elements --> */}
      <div className="container-fuild">
        {/* <!-- Grid row--> */}
        <div className="row">
          {/* <!-- Grid column --> */}
          <div className="col-sm-12 col-md-4"></div>
          <div className="col-sm-12 col-md-4 text-center">
            <div className="footer-logo">
              <img src={logo} />
            </div>
            <p className="footer-p">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="social">
              {/* <!-- Facebook --> */}
              <a
                href="https://web.facebook.com/profile.php?id=100032894001313&_rdc=1&_rdr"
                target="_blank"
                className="fb-ic"
              >
                <img src={fb} />
              </a>
              {/* <!--instagram --> */}
              <a href="https://www.instagram.com/myvoyagesofficial/" target="_blank" className="yt-ic">
                <img src={insta} />
              </a>
              {/* <!-- linkedln --> */}
              <a href="https://www.linkedin.com/company/myvoyages/" target="_blank" className="inst-ic">
                <img src={linkedIn} />
              </a>
              {/* <!-- tiktok +--> */}
              <a href="https://www.tiktok.com/@myvoyagesofficial?lang=en" target="_blank" className="li-ic">
                <img src={tiktok} />
              </a>
            </div>
          </div>
          <div className="col-sm-12 col-md-4"></div>
        </div>
        <div className="footer-line"></div>
        {/* <!-- Copyright --> */}
        <p className="text-center footer-p">MY VOYAGES © 2023 ALL RIGHTS RESERVED.</p>

        {/* <!-- Copyright --> */}
        {/* <!-- Grid row--> */}
      </div>
    </footer>
  );
};

export default Footer;
