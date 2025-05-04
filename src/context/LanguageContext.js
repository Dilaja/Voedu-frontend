import React, { createContext, useState, useContext } from "react";

// Translation data
const translations = {
  en: {
    home: "Home",
    about: "About",
    contact: "Contact",
    signIn: "Sign In",
    register: "Course Register",
    dashboard: "Dashboard",
    selectLanguage: "Select Language",
    welcome: "Welcome to VoEdu",
  },
  si: {
    home: "මුල් පිටුව",
    about: "අප ගැන",
    contact: "අපව අමතන්න",
    signIn: "ඇතුල් වන්න",
    register: "ලියාපදිංචි වන්න",
    dashboard: "පරිපාලක පුවරුව",
    selectLanguage: "භාෂාව තෝරන්න",
    welcome: "VoEdu වෙත සාදරයෙන් පිළිගනිමු",
  },
  ta: {
    home: "முகப்பு",
    about: "எங்களை பற்றி",
    contact: "தொடர்பு கொள்ள",
    signIn: "உள்நுழைவு",
    register: "பதிவு செய்யவும்",
    dashboard: "டாஷ்போர்ட்",
    selectLanguage: "மொழியை தேர்ந்தெடுங்கள்",
    welcome: "VocEdக்கு வரவேற்கிறோம்",
  },
};

// Create Context
const LanguageContext = createContext();

// Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => useContext(LanguageContext);
