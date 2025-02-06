import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    donate: {
      title: "Donate",
      links: [
        { name: "Categories", href: "#" },
        { name: "Crisis relief", href: "#" },
        { name: "Social Impact Funds", href: "#" },
        { name: "Supporter Space", href: "#" },
      ],
    },
    fundraise: {
      title: "Fundraise",
      links: [
        { name: "How to start a GoFundMe", href: "#" },
        { name: "Fundraising categories", href: "#" },
        { name: "Team fundraising", href: "#" },
        { name: "Fundraising Blog", href: "#" },
        { name: "Charity fundraising", href: "#" },
        { name: "Sign up as a charity", href: "#" },
      ],
    },
    about: {
      title: "About",
      links: [
        { name: "How GoFundMe works", href: "#" },
        { name: "GoFundMe Giving Guarantee", href: "#" },
        { name: "Supported countries", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Help Center", href: "#" },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { name: "About GoFundMe and Classy", href: "#" },
        { name: "Newsroom", href: "#" },
        { name: "Careers", href: "#" },
        { name: "GoFundMe.org", href: "#" },
      ],
    },
  };

  return (
    <footer className="border-t border-[#e5e1d7] pt-12 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-base mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#6b6966] hover:text-[#252525] text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* <div className="border-t border-[#e5e1d7] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <button className="flex items-center gap-2 text-sm border rounded-full px-4 py-2">
                🇺🇸 United States · English
              </button>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-[#6b6966]">
                <span>© 2010-2025 GoFundMe</span>
                <a href="#" className="hover:text-[#252525]">
                  Terms
                </a>
                <a href="#" className="hover:text-[#252525]">
                  Privacy Notice
                </a>
                <a href="#" className="hover:text-[#252525]">
                  Legal
                </a>
                <a href="#" className="hover:text-[#252525]">
                  Accessibility Statement
                </a>
                <a href="#" className="hover:text-[#252525]">
                  Cookie Policy
                </a>
                <div className="flex items-center gap-2">
                  <span>Your Privacy Choices</span>
                  <img
                    src="/path-to-your-privacy-icon.svg"
                    alt="Privacy Choices"
                    className="h-4"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" aria-label="YouTube">
                  <FaYoutube />
                </a>
                <a href="#" aria-label="Twitter">
                  <FaXTwitter />
                </a>
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="Medium">
                  <FaMedium />
                </a>

                <a href="#" aria-label="Podcast">
                  <FaMicrophone />
                </a>
              </div>
              <div className="flex gap-4">
                <a href="#">
                  <img
                    src="/google-play.png"
                    alt="Get it on Google Play"
                    className="h-10"
                  />
                </a>
                <a href="#">
                  <img
                    src="/app-store.png"
                    alt="Download on the App Store"
                    className="h-10"
                  />
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
