import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ApplicantsTable from "./ApplicantsTable";  // adjust path if needed
import axios from "axios";
import { socketcontext } from "@/context/socketConext";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("axios");
// Mock props and data
const mockApplicants = [
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      skills: ["React", "Node.js"],
      status: "Pending"
    }
  ];
  const mockApplicantsResponse = {
  data: {
    status: true,
    job: {
      title: "Frontend Developer",
      applications: [
        {
          _id: "app1",
          status: "pending",
          applicant: {
            _id: "1",
            firstName: "Alice",
            lastName: "Smith",
            email: "alice@example.com",
            profile: {
              skills: ["React", "Node.js"],
              bio: "Full Stack Dev",
              resume: "https://example.com/resume.pdf",
              profilePhoto: "https://example.com/avatar.jpg",
            },
          },
        },
      ],
      company: {
        companyName: "Acme Inc.",
        companyEmail: "contact@acme.com",
      },
    },
  },
};
const mockJob = { _id: "job1", title: "Frontend Developer" };
const mockCompany = { _id: "comp1", name: "Awesome Inc." };
const mockSocket = { emit: vi.fn() };

describe("ApplicantsTable Component", () => {
    it('renders table headers correctly', async () => {
        render(
          <ApplicantsTable
            applicants={[]}
            isLoading={false}
            onSort={() => {}}
            sortConfig={null}
          />
        );
        
        // Check for actual headers in your table
        expect(await screen.findByText("Profile")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Skills")).toBeInTheDocument();
        expect(screen.getByText("Bio")).toBeInTheDocument();
        expect(screen.getByText("Resume")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
      });

      it("shows 'No applicants found' when no data is available", async () => {
        // Mock the loading state to be false
        render(
          <ApplicantsTable 
            job={mockJob} 
            company={mockCompany} 
            socket={mockSocket}
            isLoading={false} // Explicitly set loading to false
            applicants={[]} // Pass empty array
          />
        );
      
        // Use findByText for async rendering
        expect(await screen.findByText(/No applicants found/i)).toBeInTheDocument();
      });

      test("renders applicant data correctly", async () => {
        axios.get.mockResolvedValueOnce(mockApplicantsResponse);
      
        render(
          <socketcontext.Provider value={{ socket: mockSocket }}>
            <MemoryRouter initialEntries={["/job/123"]}>
              <Routes>
                <Route path="/job/:jobId" element={<ApplicantsTable />} />
              </Routes>
            </MemoryRouter>
          </socketcontext.Provider>
        );
      
        // Wait for Alice's name to appear in the table
        expect(await screen.findByText((content) => content.includes("Alice"))).toBeInTheDocument();
        expect(screen.getByText("alice@example.com")).toBeInTheDocument();
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("Node.js")).toBeInTheDocument();
      });




});
