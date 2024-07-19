import React from "react";
import logo from "@/assets/images/logo_minimiracle.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer border text-base-content p-10">
      <aside>
        <Image
          width="50"
          height="50"
          viewBox="0 0 24 24"
          src={logo}
          className="fill-current"
        >
        </Image>
        <p className="font-bold">
          MiniMiracle.
          <br />
          2024
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Section</h6>
        <div className="link link-hover"><Link href="/">Home</Link></div>
        <div className="link link-hover">Feature</div>
        <div className="link link-hover">Pricing</div>
        <div className="link link-hover">FAQs</div>
        <div className="link link-hover">About</div>
      </nav>
      <nav>
        <h6 className="footer-title">About US</h6>
        <a className="link link-hover">Description</a>
        <a className="link link-hover">Location</a>
        <a className="link link-hover">Contact</a>
      </nav>
      <nav>
        <h6 className="footer-title">Sosial Media</h6>
        <a className="link link-hover">Minimiracle@gmail.com</a>
        <a className="link link-hover">@Minimiracle07</a>
        <a className="link link-hover">MiniMiracle07</a>
      </nav>
    </footer>
  );
}
