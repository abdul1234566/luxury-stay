// import SignUp from "@/components/Auth/SignUp";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//     title:
//         "Sign Up | Homely",
// };

// const SignUpPage = () => {
//     return (
//         <>
//             <section className="pt-44!">
//                 <div className="p-16 container mx-auto max-w-540 py-5 rounded-2xl shadow-auth dark:shadow-dark-auth">
//                     <SignUp />
//                 </div>
//             </section>
//         </>
//     );
// };

// export default SignUpPage;





"use client";

import SignUp from "@/components/Auth/SignUp";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Same premium theme used for SignIn
  const colors = {
    bg: isDark ? "#1E1B18" : "#F5F0E1",
    cardBg: isDark ? "#2C2723" : "#FFFFFF",
    inputBg: isDark ? "#3A332F" : "#FDFCFA",
    inputBorder: isDark ? "#5C524B" : "#D8D1C8",
    text: isDark ? "#F2E9E1" : "#3B2F2F",
    buttonBg: isDark ? "#A78256" : "#DCCAB0",
    buttonText: isDark ? "#FFF5E1" : "#3B2F2F",
    buttonHover: isDark ? "#8F6948" : "#CBB292",
    link: isDark ? "#FFD700" : "#A78256",
    shadow: isDark
      ? "0 20px 40px rgba(0,0,0,0.35)"
      : "0 20px 40px rgba(0,0,0,0.12)",
  };

  return (
    <section
      className="pt-44 min-h-screen transition-all duration-500"
      style={{ background: colors.bg }}
    >
      <div
        className="max-w-lg mx-auto p-12 rounded-2xl shadow-2xl transition-all"
        style={{
          background: colors.cardBg,
          color: colors.text,
          boxShadow: colors.shadow,
        }}
      >
        {/* Inject theme styles just like SignIn */}
        <style>
          {`
            /* Input fields */
            .signup-theme-wrapper input {
              background: ${colors.inputBg};
              color: ${colors.text};
              border: 1px solid ${colors.inputBorder};
              padding: 14px;
              border-radius: 14px;
              font-size: 16px;
              transition: 0.3s ease;
            }

            .signup-theme-wrapper input:focus {
              border-color: ${colors.buttonBg};
              outline: none;
              box-shadow: 0 0 0 3px ${colors.buttonBg}30;
            }

            /* Buttons (Sign Up + Google) */
            .signup-theme-wrapper button,
            .signup-theme-wrapper .google-btn {
              background: ${colors.buttonBg};
              color: ${colors.buttonText};
              padding: 14px;
              width: 100%;
              border-radius: 14px;
              font-weight: 600;
              transition: 0.3s ease;
            }

            .signup-theme-wrapper button:hover,
            .signup-theme-wrapper .google-btn:hover {
              background: ${colors.buttonHover};
              transform: scale(1.02);
            }

            /* Links */
            .signup-theme-wrapper a {
              color: ${colors.link};
              font-weight: 500;
              transition: 0.3s ease;
            }

            .signup-theme-wrapper a:hover {
              opacity: 0.8;
            }
          `}
        </style>

        <div className="signup-theme-wrapper">
          <SignUp />
        </div>
      </div>
    </section>
  );
}
