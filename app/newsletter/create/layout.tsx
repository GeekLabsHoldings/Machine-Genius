import CreateNewsletterContextProvider from "./_context/createNewsletterContext";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <CreateNewsletterContextProvider>
        {children}
      </CreateNewsletterContextProvider>
    </>
  );
};

export default layout;
