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
      </div>
    </footer>
  );
};

export default Footer;
