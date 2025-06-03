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
                  className="transition-all duration-300 hover:text-white"
                >
                  {char}
                </span>
              ))}
            </div>
            <p className="mt-3 text-gray-400 max-w-xs mx-auto md:mx-0">
              Empowering students and fresh graduates to launch their careers with confidence. Intern Pilot is your co-pilot on the journey from classroom to career.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:w-2/3">
            {[
              {
                title: "EXPLORE CAREERS",
                links: [
                  "Internship Opportunities",
                  "Career Paths",
                  "Top Companies",
                  "Remote Internships",
                  "Job Shadowing",
                ],
              },
              {
                title: "RESOURCES",
                links: [
                  "Resume Builder",
                  "Cover Letter Tips",
                  "Interview Prep",
                  "LinkedIn Guide",
                  "Portfolio Advice",
                ],
              },
              {
                title: "COMMUNITY",
                links: [
                  "Success Stories",
                  "Mentor Sessions",
                  "Webinars & Events",
                  "Campus Ambassadors",
                ],
              },
              {
                title: "TOOLS",
                links: [
                  "Skill Assessment",
                  "Internship Tracker",
                  "ATS Checker",
                  "Salary Estimator",
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
                        className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
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
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center  transition-all duration-300">
              <span className="mr-2">🌐</span>
              <span>English</span>
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center md:text-left text-gray-400 text-xs ">
          <p className="">
            &copy; 2024 Intern Pilot |{" "}
            <a
              href="#"
              className="hover:text-white  transition-all duration-300"
            >
              Terms & Conditions
            </a>{" "}
            |{" "}
            <a
              href="#"
              className="hover:text-white  transition-all duration-300"
            >
              Privacy Policy
            </a>{" "}
            |{" "}
            <a
              href="#"
              className="hover:text-white transition-all duration-300"
            >
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
