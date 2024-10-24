import CreateNewsletterContextProvider from "./_context/createNewsletterContext";
import NewsletterIdBrandProvider from "./_context/newsletterIdBrand";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <CreateNewsletterContextProvider>
        <NewsletterIdBrandProvider>
          {children}
        </NewsletterIdBrandProvider>
      </CreateNewsletterContextProvider>
    </>
  );
};

export default layout;
