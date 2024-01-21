import React from 'react';
import Navbar from './Navbar';
import Pro from '../Images/pro.png'

const AboutUsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto h-screen p-8">
        <h1 className=" w-full lg:w-[50%] md:w-[50%] text-3xl font-bold text-center">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
          {/* Left side - Text content */}
          <div>
            <p className="text-lg mb-4">
              Welcome to Provision Store, your one-stop destination for all your
              daily provision needs. We are passionate about providing quality
              products to our customers and ensuring a seamless shopping
              experience.
            </p>
            <p className="text-lg mb-4">
              Our diverse range of products includes Millets, Grains & Flours,
              Dry fruits & Berries, Nuts and Seeds, Cold pressed Oils and Ghee,
              Natural Sweeteners, Spices & Staples, Healthy Breakfast, Snacks &
              Energy Boosters, Wellness & Supplements, and much more.
            </p>
            <p className="text-lg mb-4">
              At Provision Store, we believe in offering the best quality
              provisions at competitive prices. Our commitment is to make your
              daily shopping convenient, affordable, and enjoyable.
            </p>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center items-center">
            <img
              src={Pro}             alt="About Us"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
