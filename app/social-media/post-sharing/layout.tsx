import SocialMediaPostCreationContextProvider from "./_context/socialMediaPostSharingContext";

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
