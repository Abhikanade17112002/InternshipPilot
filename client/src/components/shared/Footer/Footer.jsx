
import facebook from "../../../assets/facebook.png";
import twitter from "../../../assets/twitter.png";
import insta from "../../../assets/insta.png";
import youtube from "../../../assets/youtube.webp";


const Footer = () => {
  return (
    <footer className="bg-[#0B0133] text-white py-8 text-[12px]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          {/* Brand Section */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <div className="flex justify-center md:justify-start items-center space-x-1 md:text-2xl text-lg font-bold tracking-widest">
              {"Intern Pilot".split("").map((char, index) => (
                <span
                  key={index}
                  className="transition-all duration-300 hover:text-purple-400"
                >
                  {char}
                </span>
              ))}
            </div>
            <p className="mt-3 text-red-500 max-w-xs mx-auto md:mx-0">
              Disclaimer : All The Names And Images Used In This Project Are Valid Till Educational Purpose Use Only 
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:w-2/3">
            {[
              {
                title: "BUILD YOUR BUSINESS",
                links: [
                  "Business ideas",
                  "Case studies",
                  "Design & branding",
                  "Dropshipping",
                  "Marketing",
                ],
              },
              {
                title: "STORIES",
                links: [
                  "A day in my life",
                  "My first 90 days",
                  "Raise the bar",
                  "Starter stories",
                ],
              },
              {
                title: "YOUR LIFE",
                links: ["Mindset", "Money", "Productivity", "Well-being"],
              },
              {
                title: "FREE BUSINESS TOOLS",
                links: [
                  "Business Name Generator",
                  "Slogan Generator",
                  "Traffic Calculator",
                  "Profit Margin Calculator",
                ],
              },
            ].map((section, i) => (
              <div key={i}>
                <h3 className="font-semibold text-white mb-3">{section.title}</h3>
                <ul className="space-y-1">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-purple-400 transition-all duration-300 ease-in-out"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Language Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Social Icons */}
          <div className="flex space-x-4">
            {[insta, youtube, facebook, twitter].map((icon, index) => (
              <a
                key={index}
                href="#"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src={icon} alt="Social Media" className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Language Button */}
          <div className="mt-4 md:mt-0">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-500 transition-all duration-300">
              <span className="mr-2">🌐</span>
              <span>English</span>
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center md:text-left text-gray-400 text-xs">
          <p>
            &copy; 2015-2024 Oberlo |{" "}
            <a
              href="#"
              className="hover:text-purple-400 transition-all duration-300"
            >
              Legal
            </a>{" "}
            |{" "}
            <a
              href="#"
              className="hover:text-purple-400 transition-all duration-300"
            >
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
