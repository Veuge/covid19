import React from "react";
import { FaHeart } from "react-icons/fa";

const BLOG_LINK = "https://veuge.github.io/";
const API_LINK = "https://disease.sh/";

const Footer = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>
        Hecho con <FaHeart color="red" /> por{" "}
        <a href={BLOG_LINK} target="__blank">Vero Clavijo</a>. Esta aplicación usa
        la API de <a href={API_LINK} target="__blank">disease.sh</a>.
      </p>
    </div>
  </footer>
);

export default Footer;
