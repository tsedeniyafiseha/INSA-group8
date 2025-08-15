import React, { useState } from "react";

const facultyData = [
  {
    name: "Abate Ayele Adeko",
    title: "Chief Technical Assistant",
    department: "Biotechnology",
    college: "College of Natural and Applied Science",
    expertise: "Microbial and Environmental Biotechnology",
    email: "abate.ayele@aastu.edu.et",
    education: "MSc in Industrial and Environmental Biotechnology",
    publication: "22 publications",
  },
  {
    name: "Alemseged Moreda",
    title: "Chief Technical Assistant",
    department: "",
    email: "alemseged.moreda@aastu.edu.et",
    education: "MSc",
  },
  {
    name: "Ali Wale Tarekegn",
    title: "Lecturer",
    department: "Humanities Division",
    college: "College of Social Science and Humanities",
    expertise:
      "Physical fitness & nutrition on hypokinetic diseases, Effects of technology on modern sports",
    email: "ali.wale@aastu.edu.et",
    education:
      "MSc in Coaching Volleyball & MSc in Coaching Athletics",
    publication:
      "International Journal of Health, Physical Education and Computer Science in Sports (Vol.32, Impact Factor 5.115)",
  },
  {
    name: "Asaminew Gizaw Egu",
    title: "Lecturer",
    department: "Electrical and Computer Engineering",
    college: "Engineering",
    expertise: "Software engineering and AI",
    email: "asamnew.gizaw@aastu.edu.et",
    education: "MSc",
    publication: "3 publications",
  },
  {
    name: "Belete Sirahbizu Yigezu",
    title: "Associate Professor",
    department: "Mechanical Engineering",
    college: "Engineering",
    expertise:
      "Modeling metals, polymers, ceramics, nanomaterials, shape memory materials, and joining techniques",
    email: "belete.sirhabizu@aastu.edu.et",
    education: "PhD",
    publication:
      "40+ research articles, 20+ conference papers (ResearchGate & ORCID linked)",
  },
  {
    name: "Betelhem Lakew Mamo",
    title: "Chief Technical Assistant",
    department: "Food Science and Applied Nutrition",
    college: "College of Natural and Applied Science",
    expertise: "Nutrition",
    email: "betelhem.lakew@aastu.edu.et",
    education: "Master’s Degree",
  },
  {
    name: "Biniam Atnafe Beyene",
    title: "Assistant Professor",
    department: "Humanities Division",
    college: "College of Social Science and Humanities",
    expertise:
      "Contrastive Rhetoric, Language & Communication, Translation, Media, Crisis Communication",
    email: "biniam.atnafe@aastu.edu.et",
    education: "PhD in Applied Linguistics and Communication",
    publication:
      "Books: Basic Writing Skills (2019), Communicative English Skills (2019)",
  },
  {
    name: "Bonsa Reta Mosisa",
    title: "Lecturer",
    department: "Mechanical Engineering",
    college: "Engineering",
    expertise:
      "Renewable Energy, Thermal Energy Storage, HVAC, Motor Vehicle Fleet Management",
    email: "bonsa.reta@aastu.edu.et",
    education: "BSc in Mechanical Engineering, MSc in Thermal Engineering",
  },
  {
    name: "Chere Lemma Urgaya",
    title: "Lecturer",
    department: "Software Engineering",
    college: "Engineering",
    expertise:
      "AI, Machine Learning, Big Data, Data Science, Networking & Cybersecurity, Smart City",
    email: "chere.lemma@aastu.edu.et",
    education:
      "M.Tech in Computer Science and Technology, Andhra University; BSc in Computer Science, Dilla University",
    publication:
      "Google Scholar & ORCID: https://orcid.org/0000-0002-3286-372",
  },
  {
    name: "Dagmawie Tesfaye Mengistu",
    department: "Social Sciences Division",
    college: "College of Social Science and Humanities",
    expertise:
      "History, Heritage, Minority Studies, Philosophy of History, Historiography",
    email: "dagmawie.tesfaye@aastu.edu.et",
    education: "PhD",
    publication:
      "Multiple academic papers, books, and book chapters on Ethiopian history and society",
  },
];

export default function FacultyDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const departments = [
    "All Departments",
    ...new Set(facultyData.map((f) => f.department).filter(Boolean)),
  ];

  const filteredFaculty = facultyData.filter((faculty) => {
    const matchesSearch = faculty.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "All Departments" ||
      faculty.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-poppins">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        AASTU Faculty Directory
      </h1>
      <p className="mb-8 text-gray-600">
        Explore our distinguished faculty members and their expertise.
      </p>

      {}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="search"
          placeholder="Search faculty..."
          className="border border-gray-300 rounded px-4 py-2 flex-grow max-w-xs focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {}
       <div className="relative">
  <button
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="px-4 py-2 rounded-md bg-white border text-gray-700  transition-colors flex items-center gap-2"
  >
    {departmentFilter} <span></span>
  </button>

  {dropdownOpen && (
    <ul className="absolute left-0 mt-2 w-62 bg-gray-100 shadow-lg rounded-lg overflow-hidden z-50">
      {departments.map((dep) => (
        <li key={dep}>
          <button
            onClick={() => {
              setDepartmentFilter(dep);
              setDropdownOpen(false);
            }}
            className={`w-full text-left px-4 py-2 text-sm max-w-[220px] overflow-x-auto whitespace-nowrap scrollbar-none ${
              departmentFilter === dep
                ? "bg-gray-300 text-emerald-500"
                : "text-blue-600"
            }  hover:text-emerald-500 transition`}
            style={{
              WebkitOverflowScrolling: "touch", // smooth swipe on mobile
            }}
          >
            {dep}
          </button>
        </li>
      ))}
    </ul>
  )}
</div>


        <button
          onClick={() => {
            setSearchTerm("");
            setDepartmentFilter("All Departments");
          }}
          className="ml-auto text-blue-600 hover:underline"
        >
          Clear Filters
        </button>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFaculty.length === 0 ? (
          <p className="text-red-500 col-span-2">
            No faculty found matching your criteria.
          </p>
        ) : (
          filteredFaculty.map((faculty, idx) => (
            <div
              key={idx}
              className="p-6 bg-gradient-to-r from-[#cdd7eb] to-[#acf0d9] border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-lg font-bold">
                  {faculty.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {faculty.name}
                  </h2>
                  {faculty.title && (
                    <p className="text-sm text-gray-500">{faculty.title}</p>
                  )}
                  {faculty.department && (
                    <p className="text-blue-700 font-medium">
                      {faculty.department}
                    </p>
                  )}
                  {faculty.college && (
                    <p className="text-green-600 text-sm">{faculty.college}</p>
                  )}
                  {faculty.expertise && (
                    <p className="italic text-gray-600 mt-1">
                      {faculty.expertise}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-700 space-y-1">
                {faculty.education && (
                  <p>
                    <strong>Qualification:</strong> {faculty.education}
                  </p>
                )}
                {faculty.email && (
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${faculty.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {faculty.email}
                    </a>
                  </p>
                )}
                {faculty.publication && (
                  <p>
                    <strong>Publication:</strong> {faculty.publication}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
