import Header from "../component/header";
import Navbar from "../component/Navbar";

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header/>
      <Navbar/>
      
      {children}
    </main>
  );
}
