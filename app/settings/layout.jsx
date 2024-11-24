import Navbar from "../Components/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
        <div className="flex">
            <Navbar />

         
            {children}

        </div>
    </>
  );
}
