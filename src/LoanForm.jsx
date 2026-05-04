import { useState } from "react";
import {
  User,
  Briefcase,
  IndianRupee,
  MapPin
} from "lucide-react";

export default function LoanForm() {
  const API_URL = process.env.REACT_APP_API_URL;
  console.log("API URL:", API_URL);
  const [activeSection, setActiveSection] = useState("personal");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    pan: "",
    aadhaar: "",
    employmentType: "",
    company: "",
    monthlyIncome: "",
    loanAmount: "",
    loanPurpose: "",
    tenure: "",
    address: ""
  });

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.loanAmount) {
      alert("Please fill required fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/apply-loan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          dob: form.dob || null,
          monthlyIncome: form.monthlyIncome ? Number(form.monthlyIncome) : null,
          loanAmount: form.loanAmount ? Number(form.loanAmount) : null
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert(data.message || "Saved successfully!");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        pan: "",
        aadhaar: "",
        employmentType: "",
        company: "",
        monthlyIncome: "",
        loanAmount: "",
        loanPurpose: "",
        tenure: "",
        address: ""
      });

    } catch (err) {
      console.error("❌ ERROR:", err);
      alert(err.message);
    }
  };

  return (
    <div style={pageContainer}>
      <style>
        {`
          @media (max-width: 768px) {
            .responsive-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      <form onSubmit={handleSubmit} style={formContainer}>
        <h1 style={header}>Loan Application</h1>

        <Section title="Personal Details" icon={User} isOpen={activeSection === "personal"} onClick={() => toggleSection("personal")}>
          <Field label="Full Name *">
            <input name="fullName" value={form.fullName} onChange={handleChange} style={input} />
          </Field>

          <Field label="Email *">
            <input name="email" value={form.email} onChange={handleChange} style={input} />
          </Field>

          <Field label="Phone">
            <input name="phone" value={form.phone} onChange={handleChange} style={input} />
          </Field>

          <Field label="Date of Birth">
            <input type="date" name="dob" value={form.dob} onChange={handleChange} style={input} />
          </Field>

          <Field label="Gender">
            <select name="gender" value={form.gender} onChange={handleChange} style={input}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </Field>

          <Field label="PAN">
            <input name="pan" value={form.pan} onChange={handleChange} style={input} />
          </Field>

          <Field label="Aadhaar">
            <input name="aadhaar" value={form.aadhaar} onChange={handleChange} style={input} />
          </Field>
        </Section>

        <Section title="Employment Details" icon={Briefcase} isOpen={activeSection === "employment"} onClick={() => toggleSection("employment")}>
          <Field label="Employment Type">
            <select name="employmentType" value={form.employmentType} onChange={handleChange} style={input}>
              <option value="">Select</option>
              <option>Salaried</option>
              <option>Self-employed</option>
            </select>
          </Field>

          <Field label="Company">
            <input name="company" value={form.company} onChange={handleChange} style={input} />
          </Field>

          <Field label="Monthly Income">
            <input type="number" name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} style={input} />
          </Field>
        </Section>

        <Section title="Loan Details" icon={IndianRupee} isOpen={activeSection === "loan"} onClick={() => toggleSection("loan")}>
          <Field label="Loan Amount *">
            <input type="number" name="loanAmount" value={form.loanAmount} onChange={handleChange} style={input} />
          </Field>

          <Field label="Loan Purpose">
            <input name="loanPurpose" value={form.loanPurpose} onChange={handleChange} style={input} />
          </Field>

          <Field label="Tenure">
            <select name="tenure" value={form.tenure} onChange={handleChange} style={input}>
              <option value="">Select</option>
              <option>12 months</option>
              <option>24 months</option>
              <option>36 months</option>
              <option>60 months</option>
            </select>
          </Field>
        </Section>

        <Section title="Address" icon={MapPin} isOpen={activeSection === "address"} onClick={() => toggleSection("address")}>
          <Field label="Full Address">
            <textarea name="address" value={form.address} onChange={handleChange} style={input} />
          </Field>
        </Section>

        <button type="submit" style={button}>
          Submit Application
        </button>
      </form>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Section({ title, children, isOpen, onClick, icon: Icon }) {
  return (
    <div style={sectionContainer}>
      <div onClick={onClick} style={sectionHeader}>
        <div style={headerLeft}>
          {Icon && <Icon size={18} />}
          <span>{title}</span>
        </div>
        <span>{isOpen ? "−" : "+"}</span>
      </div>

      {isOpen && (
        <div style={sectionContent} className="responsive-grid">
          {children}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

/* ---------- STYLES ---------- */

const pageContainer = {
  minHeight: "100vh",
  background: "#f4f6f9",
  padding: "20px"
};

const formContainer = {
  maxWidth: "1000px",
  margin: "auto",
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const header = {
  marginBottom: "20px"
};

const sectionContainer = {
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden"
};

const sectionHeader = {
  background: "#f0f2f5",
  padding: "12px 15px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "600"
};

const headerLeft = {
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const sectionContent = {
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px"
};

const labelStyle = {
  fontSize: "14px",
  marginBottom: "4px",
  fontWeight: "500"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const button = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  background: "#0176d3",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer"
};