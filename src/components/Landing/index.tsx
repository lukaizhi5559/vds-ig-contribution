/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">Verizon</span>
            <nav className="ml-8 flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-black">
                Mobile
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                Internet
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                Solutions
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                Insights
              </a>
            </nav>
          </div>
          <div className="bg-gray-400 rounded-full h-8 w-8 flex items-center justify-center">
            🔍
          </div>
        </div>
      </header>

      {/* Landing Page Content */}
      <main className="container mx-auto px-6 py-10 grid grid-cols-2 gap-8">
        {/* Contribution Model Card */}
        <Card>
          <CardHeader>
            <CardTitle>Contribution Model</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Streamline submissions and tracking
            </p>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Expansion Packing Card */}
        <Card>
          <CardHeader>
            <CardTitle>Expansion Packing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Maintain high-quality contributions
            </p>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Explore
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-auto">
        <div className="container mx-auto px-6 py-4 flex justify-start space-x-10">
          <a href="#" className="text-gray-700 hover:text-black">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Terms of Service
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
