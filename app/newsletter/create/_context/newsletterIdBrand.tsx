"use client";
import React, { createContext, useEffect, useState } from "react";

export const NewsletterIdBrandContext = createContext<any>(null);

const NewsletterIdBrandProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newsletterIdBrand, setNewsletterIdBrand] = useState<any>("");

  useEffect(() => {
    const newsletterIdBrand = sessionStorage.getItem("Newsletter-idBrand");
    if (newsletterIdBrand) {
      setNewsletterIdBrand(JSON.parse(newsletterIdBrand));
    }
  }, []);
  return (
    <NewsletterIdBrandContext.Provider
      value={{ newsletterIdBrand, setNewsletterIdBrand }}
    >
      {children}
    </NewsletterIdBrandContext.Provider>
  );
};

export default NewsletterIdBrandProvider;
