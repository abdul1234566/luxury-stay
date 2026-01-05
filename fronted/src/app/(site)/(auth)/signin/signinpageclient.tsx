"use client";

import Signin from "@/components/Auth/SignIn";
import { useTheme } from "next-themes";

const SigninPageClient = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#1E1B18" : "#F5F0E1",
    cardBg: isDark ? "#2A2522" : "#FFFFFF",
    text: isDark ? "#F2E9E1" : "#3B2F2F",
    buttonBg: isDark ? "#DCCAB0" : "#A78256",
    buttonHover: isDark ? "#DCCAB0" : "#A78256",
    buttonText: "#ffffff",
    shadow: isDark ? "0 0 25px rgba(0,0,0,0.55)" : "0 0 25px rgba(0,0,0,0.08)",
  };

  return (
    <section
      className="pt-44 transition-colors duration-500"
      style={{ background: colors.bg }}
    >
      <div
        className="container mx-auto max-w-540 py-5 p-16 rounded-2xl"
        style={{
          background: colors.cardBg,
          color: colors.text,
          boxShadow: colors.shadow,
        }}
      >
        {/* Apply theme override */}
        <div className="signin-theme-wrapper" style={{ color: colors.text }}>
          <style>
  {`
    /* Inputs */
    .signin-theme-wrapper input {
      background: ${isDark ? "#3A332F" : "#FDFCFA"};
      color: ${colors.text};
      border-radius: 10px;
      border: 1px solid ${isDark ? "#5C524B" : "#D8D1C8"};
      padding: 12px;
      transition: 0.3s;
    }

    .signin-theme-wrapper input:focus {
      outline: none;
      border-color: ${colors.buttonBg};
      box-shadow: 0 0 8px ${colors.buttonBg}55;
    }

    /* Primary Buttons */
    .signin-theme-wrapper button,
    .signin-theme-wrapper .google-btn {
      background: ${colors.buttonBg};
      color: ${colors.buttonText};
      border-radius: 12px !important;
      padding: 12px 20px;
      font-weight: 600;
      transition: 0.3s;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    /* Hover — matches primary button */
    .signin-theme-wrapper button:hover,
    .signin-theme-wrapper .google-btn:hover {
      background: ${colors.buttonHover};
    }

    /* Google icon stays visible */
    .signin-theme-wrapper .google-btn svg {
      width: 20px;
      height: 20px;
    }

    /* Links */
    .signin-theme-wrapper a {
      color: ${colors.buttonBg};
      transition: 0.3s;
    }
    .signin-theme-wrapper a:hover {
      color: ${colors.buttonHover};
    }
  `}
</style>



          <Signin />
        </div>
      </div>
    </section>
  );
};

export default SigninPageClient;
