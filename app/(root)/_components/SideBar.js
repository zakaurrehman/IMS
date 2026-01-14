
"use client";
import { useState, useContext } from "react";
import Tltip from "../../../components/tlTip";
import imsLogo from "../../../public/logo/logoNew.svg";
import Image from "next/image";
import { FiSettings } from "react-icons/fi";
import { sideBar } from "../../../components/const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsContext } from "../../../contexts/useSettingsContext";
import { UserAuth } from "../../../contexts/useAuthContext";
import { getTtl } from "../../../utils/languages";
import styles from "./SideBar.module.css";

export default function Sidebar() {
  const pathName = usePathname();
  const { setDates, compData } = useContext(SettingsContext);
  const { userTitle } = UserAuth();
  const ln = compData?.lng || "English";
  const [openDropdowns, setOpenDropdowns] = useState({});

  const showLink = userTitle !== "Accounting";

  return (
    showLink && (
      <nav
        className="relative flex flex-col h-screen overflow-hidden"
        style={{
          width: "clamp(220px, 18vw, 260px)",
          minWidth: "clamp(220px, 18vw, 260px)",
          maxWidth: "clamp(220px, 18vw, 260px)",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Logo */}
        <div
          className="shrink-0 flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 18%, rgba(14,95,165,1) 100%)",
            height: "clamp(50px, 7vh, 64px)",
            minHeight: "clamp(50px, 7vh, 64px)",
            width: "100%",
            padding: "clamp(6px, 1vw, 10px)",
          }}
        >
          <Image
            src={imsLogo}
            className="overflow-hidden transition-all hover:scale-105 duration-300"
            style={{
              height: "clamp(60px, 8vh, 88px)",
              width: "auto",
              objectFit: "contain",
              maxWidth: "100%",
            }}
            priority
            alt="IMS Logo"
            width={200}
            height={48}
          />
        </div>

        {/* Menu */}
        <div
          className="flex-1 min-h-0 flex flex-col overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #0e5fa5 0%, #0a4d84 30%, #064378 60%, #003d6e 100%)",
          }}
        >
          <ul
            className="flex-1 overflow-hidden"
            style={{
              paddingTop: "clamp(4px, 0.5vh, 6px)",
              paddingBottom: "clamp(4px, 0.5vh, 6px)",
            }}
          >
            {sideBar().map((x, i) => (
              <div key={i}>
                {x.ttl && (
                  <div
                    className="font-semibold tracking-[0.1em] uppercase"
                    style={{
                      color: "rgba(255, 255, 255, 0.45)",
                      fontSize: "clamp(7px, 0.6vw, 9px)",
                      paddingLeft: "clamp(10px, 1.5vw, 14px)",
                      paddingRight: "clamp(10px, 1.5vw, 14px)",
                      paddingBottom: "clamp(2px, 0.3vh, 4px)",
                      paddingTop: "clamp(4px, 0.6vh, 8px)",
                    }}
                  >
                    {getTtl(x.ttl, ln)}
                  </div>
                )}

                <div>
                  {x.items.map((y, k) => {
                    const isActive =
                      pathName.slice(1) === y.page ||
                      pathName.startsWith(`/${y.page}/`);

                    if (y.hasDropdown) {
                      return (
                        <div key={k}>
                          {y.subItems.map((sub, si) => {
                            const isSubActive =
                              pathName.slice(1) === sub.page;

                            return (
                              <Link
                                href={`/${sub.page}`}
                                key={si}
                                onClick={setDates}
                              >
                                <div
                                  className={`group flex items-center rounded-md cursor-pointer transition-all duration-200
                                  ${
                                    isSubActive
                                      ? "bg-gradient-to-r from-[#7ba7cc] to-[#6b9ac2] text-white font-medium shadow-lg scale-[1.01]"
                                      : "text-white/90 hover:bg-white/10 hover:translate-x-0.5"
                                  }`}
                                  style={{
                                    gap: "clamp(4px, 0.8vw, 7px)",
                                    paddingTop:
                                      "clamp(3px, 0.5vh, 5px)",
                                    paddingBottom:
                                      "clamp(3px, 0.5vh, 5px)",
                                    paddingLeft:
                                      "clamp(6px, 1.2vw, 10px)",
                                    paddingRight:
                                      "clamp(6px, 1.2vw, 10px)",
                                    marginLeft:
                                      "clamp(1px, 0.2vw, 2px)",
                                    marginRight:
                                      "clamp(1px, 0.2vw, 2px)",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize:
                                        "clamp(11px, 0.95vw, 13px)",
                                    }}
                                  >
                                    {sub.img}
                                  </span>
                                  <span
                                    style={{
                                      fontSize:
                                        "clamp(9px, 0.8vw, 11px)",
                                    }}
                                  >
                                    {getTtl(sub.item, ln)}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      );
                    }

                    return (
                      <Link
                        href={`/${y.page}`}
                        key={k}
                        onClick={setDates}
                      >
                        <div
                          className={`group flex items-center rounded-lg cursor-pointer transition-all duration-200
                          ${
                            isActive
                              ? "bg-gradient-to-r from-[#7ba7cc] to-[#6b9ac2] text-white font-medium shadow-lg scale-[1.01]"
                              : "text-white hover:bg-[#0a4d84]/50 hover:translate-x-0.5"
                          }`}
                          style={{
                            gap: "clamp(5px, 0.9vw, 7px)",
                            paddingTop:
                              "clamp(4px, 0.7vh, 7px)",
                            paddingBottom:
                              "clamp(4px, 0.7vh, 7px)",
                            paddingLeft:
                              "clamp(8px, 1.5vw, 14px)",
                            paddingRight:
                              "clamp(8px, 1.5vw, 14px)",
                            marginLeft:
                              "clamp(3px, 0.6vw, 5px)",
                            marginRight:
                              "clamp(3px, 0.6vw, 5px)",
                          }}
                        >
                          <span
                            style={{
                              fontSize:
                                "clamp(13px, 1.1vw, 15px)",
                            }}
                          >
                            {y.img}
                          </span>
                          <span
                            style={{
                              fontSize:
                                "clamp(10px, 0.9vw, 12px)",
                            }}
                          >
                            {getTtl(y.item, ln)}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Settings inside menu */}
            <Tltip direction="right" tltpText={getTtl("Settings", ln)} show={false}>
              <Link href="/settings">
                <div
                  className="group flex items-center rounded-lg cursor-pointer transition-all duration-200 text-white hover:bg-[#0a4d84]/50 hover:translate-x-0.5"
                  style={{
                    gap: "clamp(5px, 0.9vw, 7px)",
                    paddingTop:
                      "clamp(4px, 0.7vh, 7px)",
                    paddingBottom:
                      "clamp(4px, 0.7vh, 7px)",
                    paddingLeft:
                      "clamp(8px, 1.5vw, 14px)",
                    paddingRight:
                      "clamp(8px, 1.5vw, 14px)",
                    marginLeft:
                      "clamp(3px, 0.6vw, 5px)",
                    marginRight:
                      "clamp(3px, 0.6vw, 5px)",
                  }}
                >
                  <FiSettings
                    className="shrink-0 transition-transform duration-200 group-hover:rotate-90 group-hover:scale-105"
                    style={{
                      fontSize:
                        "clamp(13px, 1.1vw, 15px)",
                    }}
                  />
                  <span
                    className="font-medium tracking-wide leading-tight"
                    style={{
                      fontSize:
                        "clamp(10px, 0.9vw, 12px)",
                    }}
                  >
                    {getTtl("Settings", ln)}
                  </span>
                </div>
              </Link>
            </Tltip>
          </ul>
        </div>
      </nav>
    )
  );
}
