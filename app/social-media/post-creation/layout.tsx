import SocialMediaPostCreationContextProvider from "./_context/socialMediaPostCreationContext";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <SocialMediaPostCreationContextProvider>
        {children}
      </SocialMediaPostCreationContextProvider>
    </>
  );
};

export default layout;
