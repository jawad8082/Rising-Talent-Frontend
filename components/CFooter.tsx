//@ts-nocheck
import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";

import Image from "next/image";
import CButton from "./CButton";
import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Link from "next/link";

const MAILCHIMP_URL =
  // "https://gmail.us11.list-manage.com/subscribe/post?u=318744cf90e4188609c0ba0ec&amp;id=960b76f10c";
  "https://gmail.us14.list-manage.com/subscribe/post?u=452594143f47a121d14a50b8f&amp;id=cbcec8613b&amp;f_id=006baee0f0";

const CFooter = () => {
  const [email, setEmail] = useState("");

  return (
    <footer>
      <div className="container flex flex-col flex-wrap md:px-4 xs:py-8 md:py-16 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-100 mx-auto text-center md:mx-0 md:text-left">
          <a className="flex items-center justify-center md:justify-start">
            <Image
              src="/images/Logo-Light.svg"
              alt="RisingTalent"
              width={132}
              height={32}
            />
          </a>
          <p className="mt-4 text-dark font-semibold">
            Get the lastest Updates
          </p>

          <MailchimpSubscribe
            url={MAILCHIMP_URL}
            render={({ subscribe, status, message }) => (
              <div className="flex mt-4">
                <div>
                  <input
                    type="text"
                    className="border border-gray100 text-grey-dark text-sm bg-gray-900 rounded-md pl-3 focus:outline-none focus:bg-white focus:text-gray-900 h-12 xs:w-48 md:w-52 lg:w-64"
                    placeholder="Your Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />

                  {status === "sending" && (
                    <div style={{ color: "blue" }} className="w-40">
                      sending...
                    </div>
                  )}
                  {status === "error" && (
                    <div
                      style={{ color: "red" }}
                      dangerouslySetInnerHTML={{
                        __html: "Incorrect Email",
                      }}
                      className="w-40"
                    />
                  )}
                  {status === "success" && (
                    <div style={{ color: "green" }} className="w-40">
                      Subscribed !
                    </div>
                  )}
                </div>
                <CButton
                  // onClick={handleSubmitNewsletter}
                  customClasses="py-3 px-2 h-12 relative -left-2"
                  onClick={() => subscribe({ EMAIL: email })}
                >
                  Email Me!
                </CButton>
              </div>
            )}
          />
        </div>
        <div className="justify-around w-full mt-4 flex">
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 text-dark font-semibold">Useful Links</h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              <li>
                <a className="text-gray-600 hover:text-gray-800 ">Explore</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  How it Works
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 text-dark font-semibold">Support</h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Whitepaper</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  Terms of service
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex -mt-12 justify-around flex-wrap">
        <div>
          <p className="text-dark font-semibold xs:mt-5">
            &copy; 2023 Rising Talent. All Rights Reserved
          </p>
        </div>
        <div className="xs:mt-4 flex xs:mb-3">
          <Link href="https://www.instagram.com/" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <FaInstagram size={25} className="mr-3" />
            </a>
          </Link>

          <Link href="https://twitter.com/" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <FaTwitter size={25} className="mr-3" />
            </a>
          </Link>

          <Link href="https://discord/" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <FaDiscord size={25} className="mr-3" />
            </a>
          </Link>

          <Link href="https://github.com/" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <FaGithub size={25} className="mr-3" />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default CFooter;
