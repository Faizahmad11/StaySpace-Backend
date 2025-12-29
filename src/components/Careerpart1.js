import React, { useState, useEffect } from "react";
import heroBackground from "../assets/bgc1.jpg";

// Locations
const locations = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan"];

// Expanded Job Titles (multiple fields)
const titles = [
  "Frontend Developer", "Backend Developer", "UI/UX Designer", "Marketing Specialist",
  "Customer Support", "Data Analyst", "Project Manager", "HR Executive",
  "Sales Associate", "Content Writer", "Mobile App Developer", "SEO Specialist",
  "Teacher", "Tutor", "Nurse", "Doctor", "Pharmacist", "Accountant",
  "Electrician", "Plumber", "Carpenter", "Driver", "Chef", "Receptionist",
  "Store Manager", "Cashier", "Security Guard", "Delivery Boy", "Painter",
  "Fitness Trainer", "Event Manager", "Social Media Manager", "Photographer"
];

// Types / Timings / Pay
const types = ["Full-time", "Part-time", "Contract", "Internship"];
const timings = ["Morning", "Afternoon", "Evening", "Flexible"];
const pays = ["PKR 25k/month", "PKR 40k/month", "PKR 60k/month", "PKR 80k/month", "PKR 100k/month", "PKR 120k/month"];

// Companies
const companies = [
  { name: "TechNova", link: "https://technova.com" },
  { name: "BuildIt", link: "https://buildit.com" },
  { name: "Skyline Solutions", link: "https://skylinesolutions.com" },
  { name: "GreenLeaf", link: "https://greenleaf.com" },
  { name: "NextGen Labs", link: "https://nextgenlabs.com" },
  { name: "Global Education", link: "https://globaledu.com" },
  { name: "HealthCare Plus", link: "https://healthcareplus.com" },
  { name: "Foodies Inc", link: "https://foodies.com" }
];

// Generate mock jobs
const generateJobs = (count = 1000) => {
  const jobs = [];
  for (let i = 1; i <= count; i++) {
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomTiming = timings[Math.floor(Math.random() * timings.length)];
    const randomPay = pays[Math.floor(Math.random() * pays.length)];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];

    jobs.push({
      id: i,
      title: randomTitle,
      location: randomLocation,
      type: randomType,
      timing: randomTiming,
      pay: randomPay,
      company: randomCompany.name,
      companyLink: randomCompany.link,
    });
  }
  return jobs;
};

const CareerHero = () => {
  const [jobs] = useState(generateJobs());
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().startsWith(searchTitle.toLowerCase()) &&
        (searchLocation === "" || job.location === searchLocation)
    );
    setFilteredJobs(filtered);
  }, [searchTitle, searchLocation, jobs]);

  return (
    <section className="career-hero">
      <div
        className="career-hero__banner"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <h1 className="career-hero__title">Careers at StaySpace</h1>
      </div>

      <div className="career-search">
        <h2 className="career-search__heading">
          Quick Job Search – StaySpace Pakistan
        </h2>

        <form className="career-search__form" onSubmit={(e) => e.preventDefault()}>
          <div className="career-search__field">
            <label className="career-search__label">Job Title</label>
            <input
              type="text"
              className="career-search__input"
              placeholder="Start typing job title..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>

          <div className="career-search__field">
            <label className="career-search__label">Location</label>
            <select
              className="career-search__select"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </form>

        <div className="career-results">
          {filteredJobs.length ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="career-job-card">
                <h3>{job.title}</h3>
                <p><b>Company:</b> <a href={job.companyLink} target="_blank" rel="noreferrer">{job.company}</a></p>
                <p><b>Location:</b> {job.location}</p>
                <p><b>Type:</b> {job.type}</p>
                <p><b>Timing:</b> {job.timing}</p>
                <p><b>Pay:</b> {job.pay}</p>
              </div>
            ))
          ) : (
            <p style={{ marginTop: "20px", fontStyle: "italic", color: "#555" }}>
              {searchTitle || searchLocation ? "No jobs found matching your search." : "Start typing a job title to see results."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
