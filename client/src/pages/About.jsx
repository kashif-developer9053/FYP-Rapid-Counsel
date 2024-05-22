import React from "react";

const About = () => {
  return (
    <div className="container mx-auto flex flex-col gap-8 2xl:gap-14 py-6">
      <div className="w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5">
        <div className="w-full md:w-2/3 2xl:w-2/4">
          <h1 className="text-3xl text-black-600 font-bold mb-5">About Us</h1>
          <p className="text-justify leading-7">
            Welcome to Rapid Counsel, your trusted partner in navigating the legal landscape. Our mission is to bridge the gap between individuals and the legal professionals they need, providing a comprehensive platform that simplifies the complexities of legal matters and enhances accessibility to legal resources and services.
          </p>
        </div>
        <div className="flex ml-auto mr-auto w-100 h-100">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD0tQocL3IvaigwcJ_9DWbmi3p5giQ2fRJ_g&usqp=CAU"
            alt="About"
          />
        </div>
      </div>

      <div className="leading-8 px-5 text-justify">
        <p className="font-bold">Our Vision:</p>
        <p>
          At Rapid Counsel, we envision a world where everyone has easy access to legal assistance and knowledge, empowering individuals to confidently handle their legal rights and responsibilities. We strive to create a platform that not only connects users with the right legal professionals but also educates and informs them about their legal options.
        </p>
        
        <p className="font-bold pt-4">Our Mission:</p>
        <p>
          Our mission is to transform the way people interact with the legal system by offering innovative solutions and a user-centric platform. We aim to:
        </p>
        <ul className="list-disc list-inside pl-5">
          <li>Connect Users with Legal Professionals: Our sophisticated matching algorithm ensures that individuals find the most suitable lawyers based on their specific needs and legal issues.</li>
          <li>Provide Comprehensive Legal Resources: We offer a wealth of information, including articles, guides, and tips, to help users understand and navigate various legal matters.</li>
          <li>Facilitate Effective Communication: Our platform supports seamless communication and collaboration between users and legal professionals, making the process more efficient and effective.</li>
          <li>Ensure Accessibility and Usability: We are committed to making our platform accessible to everyone, with a focus on ease of use and understandability.</li>
        </ul>

        <p className="font-bold pt-4">Our Values:</p>
        <ul className="list-disc list-inside pl-5">
          <li>Integrity: We uphold the highest standards of integrity and transparency in all our interactions and services.</li>
          <li>Empowerment: We believe in empowering our users with the knowledge and tools they need to make informed legal decisions.</li>
          <li>Innovation: We continuously innovate to provide the best possible solutions for our users and stay ahead in the ever-evolving legal landscape.</li>
          <li>User-Centricity: Our platform is designed with the user in mind, ensuring that their needs and preferences are at the forefront of our development process.</li>
        </ul>

        <p className="font-bold pt-4">Our Team:</p>
        <p>
          Our team comprises dedicated professionals from diverse backgrounds, including legal experts, technology specialists, and customer service representatives. Together, we work tirelessly to ensure that Rapid Counsel meets the highest standards of quality and reliability.
        </p>

        <p className="font-bold pt-4">Why Choose Rapid Counsel?</p>
        <ul className="list-disc list-inside pl-5">
          <li>Expertise: Our team of legal professionals and consultants brings a wealth of knowledge and experience to guide users through their legal journeys.</li>
          <li>Reliability: We are committed to providing accurate and up-to-date information and services that users can rely on.</li>
          <li>User-Friendly: Our platform is designed to be intuitive and easy to navigate, making legal assistance accessible to everyone.</li>
          <li>Comprehensive Support: From initial consultation to final resolution, we offer end-to-end support to ensure that users receive the help they need.</li>
        </ul>

        <p className="font-bold pt-4">Contact Us:</p>
        <p>
          We are here to help you with any questions or concerns you may have. Please feel free to reach out to us:
        </p>
        <ul className="list-disc list-inside pl-5">
          <li>Email: support@rapidcounsel.com</li>
          <li>Phone: +1 (800) 123-4567</li>
          <li>Address: 123 Legal Avenue, Suite 456, Law City, Country</li>
        </ul>

        <p className="font-bold pt-4">Thank you for choosing Rapid Counsel. We are dedicated to providing you with the best possible legal support and resources.</p>
      </div>
    </div>
  );
};

export default About;
