import React from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-6">
        <div className="container mx-auto px-4">
          <Table />
        </div>
      </main>
    </div>
  );
};

export default Home;
