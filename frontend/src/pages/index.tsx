import Home from "@/components/Home";
import { UserProvider } from "@/context/UserContext";

const Index: React.FC = () => {
  return (
    <>
      <UserProvider>
        <Home />
      </UserProvider>
    </>
  );
};

export default Index;
