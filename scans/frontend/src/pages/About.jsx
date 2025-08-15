import React, { useEffect } from "react";

const features = [
  {
    id: "interactive-campus-map",
    title: "Interactive Campus Map",
    description:
      "Easily navigate the campus with our interactive and detailed map. Our map lets you explore the campus easily. You can search for buildings, classrooms, and important spots. Just click or tap on the map to see where everything is. No more getting lost — you’ll always know exactly where to go!",
    image: "/images/map.jpg",
    bg: "bg-gradient-to-r from-[#cdd7eb] to-[#acf0d9] rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description:
      "Get instant answers and support with our smart AI chatbot. Need help? Just ask! Our smart AI assistant answers your questions about your classes, campus locations, events, and more — anytime you need. It’s like having a helpful guide right in your pocket.",
    image: "/images/robot.png",
    imagesize: "h-3 w-3 object-contain"
, 
    bg: "bg-gradient-to-r from-[#cdd7eb] to-[#acf0d9]  rounded-tl-3xl rounded-tr-none rounded-bl-3xl rounded-br-3xl shadow-lg rounded-lg",
  },
  {
    id: "faculty-directory",
    title: "Faculty Directory",
    description:
      "Find faculty contacts and profiles with ease. Search by name, department, or office to get their details and reach out whenever you need.",
    image: "/images/lecture.jpg",
    bg: "bg-gradient-to-r from-[#cdd7eb] to-[#acf0d9]  rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl",
  },
  {
    id: "student-dashboard",
    title: "Student Dashboard",
    description:
      "Stay updated on classes, grades, and schedules in one place. Keep track of your class schedule, exams, and important campus events — all in one place. Stay organized and never miss anything important.",
    image: "/images/calender.png",
    bg: " bg-gradient-to-r from-[#cdd7eb] to-[#acf0d9] rounded-tl-3xl rounded-tr-none rounded-bl-3xl rounded-br-3xl"
 
  },
  {
    id: "navigation-help",
    title: "Navigation Help",
    description:
      "Never get lost on campus again with real-time navigation tips. Get step-by-step directions to anywhere on campus. Whether you’re heading to a new classroom or an event, our system guides you so you never get lost.",
    image: "/images/student.jpg",
    bg: "bg-gradient-to-r from-[#cdd7eb] to-[#acf0d9] rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl",
  },
];


export default function About() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, []);

  return (
    <div className="bg-white text-gray-800">
      {}
      <section className="bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white py-12 text-center px-6">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 max-w-2xl mx-auto">
          Learn about our innovative features designed to enhance your campus experience.
        </p>
      </section>

      {}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        {features.map((feature, index) => (
          <div
            key={index}
            id={feature.id}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {}
            <div className="flex-1 flex justify-center">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full md:w-96 h-auto rounded-lg  object-cover"
              />
            </div>

            {}
            <div
              className={`flex-1 ${feature.bg} p-8 rounded-lg shadow-md`}
            >
              <h2 className="text-2xl font-bold text-[#1f2937]">{feature.title}</h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
