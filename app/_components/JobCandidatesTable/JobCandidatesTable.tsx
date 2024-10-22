"use client";
import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

interface ICandidate {
  _id: string;
  candidate: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    department: string;
    roleName: string;
  };
  questions: [];
  taskApprove: string;
  taskLink: string;
}

const JobCandidatesTable = ({ department }: { department: string }) => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/task/all-candidate-with-answers?department=${department}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data[0]?._id) {
          setCandidates(data);
        } else {
          setCandidates([]);
          toast.error("No candidates found");
        }
      } catch (error) {
        toast.error("Error fetching candidates: " + error);
        console.error("Error fetching candidates:", error);
      }
    }
    fetchCandidates();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const handleAction = async (id: string, action: string) => {
    async function updateTaskApprove(id: string, action: string) {
      try {
        const url =
          action === "accepted"
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/task/approve-candidate-task/${id}`
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/task/reject-candidate-task/${id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        toast.error("Error updating task approve: " + error);
        console.error("Error updating task approve:", error);
      }
    }

    updateTaskApprove(id, action);
    setCandidates(
      candidates.map((candidate) =>
        candidate._id === id ? { ...candidate, taskApprove: action } : candidate
      )
    );
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.candidate.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || candidate.taskApprove === statusFilter)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Candidates</h1>
      <div className="flex mb-4 space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 pr-10 border rounded-md"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="appearance-none bg-white border rounded-md py-2 pl-3 pr-10"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-[--24px] py-[--12px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-[--24px] py-[--12px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CV
            </th>
            <th className="px-[--24px] py-[--12px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task Link
            </th>
            <th className="px-[--24px] py-[--12px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-[--24px] py-[--12px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCandidates.map((candidate) => (
            <tr key={candidate._id}>
              <td className="px-[--24px] py-[--12px] whitespace-nowrap">
                {candidate.candidate.firstName}
              </td>
              <td className="px-[--24px] py-[--12px] whitespace-nowrap">
                <a
                  href={""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View CV
                </a>
              </td>
              <td className="px-[--24px] py-[--12px] whitespace-nowrap">
                <a
                  href={candidate.taskLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Task
                </a>
              </td>
              <td className="px-[--24px] py-[--12px] whitespace-nowrap">
                <span
                  className={`px-[--12px] py-[--6px] rounded-full text-xs font-semibold
                  ${
                    candidate.taskApprove === "accepted"
                      ? "bg-green-200 text-green-800"
                      : candidate.taskApprove === "rejected"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {candidate.taskApprove.charAt(0).toUpperCase() +
                    candidate.taskApprove.slice(1)}
                </span>
              </td>
              <td className="px-[--24px] py-[--12px] whitespace-nowrap">
                <div className="space-x-2">
                  <button
                    className={`px-[--12px] py-[--4px] rounded-md text-sm font-medium ${
                      candidate.taskApprove === "accepted"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    onClick={() => handleAction(candidate._id, "accepted")}
                    disabled={candidate.taskApprove === "rejected"}
                  >
                    Accept
                  </button>
                  <button
                    className={`px-[--12px] py-[--4px] rounded-md text-sm font-medium ${
                      candidate.taskApprove === "rejected"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                    onClick={() => handleAction(candidate._id, "rejected")}
                    disabled={candidate.taskApprove === "accepted"}
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobCandidatesTable;
