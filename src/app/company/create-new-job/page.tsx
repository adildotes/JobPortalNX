"use client";

import { auth, db } from "@/firebase/firebaseconfig";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export default function CreateNewJob() {
    const [jobTitle, setJobTitle] = useState("");
    const [jd, setJD] = useState("");
    const [qualification, setQualification] = useState("");
    const [skillSet, setSkillSet] = useState("");
    const [otherReq, setOtherReq] = useState("");
    const [jobType, setJobType] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [address, setAddress] = useState("");

    const createNewJob = async () => {
        const newJob = {
            jobTitle,
            jobDescription: jd,
            qualification,
            skillSet,
            otherRequirements: otherReq,
            jobType,
            salaryRange,
            address,
            uid: auth.currentUser?.uid,
        };
        console.log(newJob);
        let newJobsRef = collection(db, "jobs");
        try {
            await addDoc(newJobsRef, newJob);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text filter drop-shadow-lg mb-2 animate-bounce">
                Job Requirements
            </h1>
            <p className="text-gray-600 text-lg mb-4 animate-fade">Fill in the details below.</p>

            <div className="card bg-gradient-to-br from-indigo-200 to-purple-300 text-gray-800 w-96 shadow-2xl gap-4 p-6 rounded-lg transform transition-transform hover:scale-105 animate-fade-in">
                <label className="input-group animate-slide-in">
                    <span className="bg-purple-700 text-base-100 font-semibold px-2">Title</span>
                    <input
                        type="text"
                        className="input input-bordered w-full text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                        placeholder="Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </label>

                <label className="input-group animate-slide-in-delay">
                    <span className="bg-purple-700 text-base-100 font-semibold px-2">Description</span>
                    <input
                        type="text"
                        className="input input-bordered w-full text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                        placeholder="Job Description"
                        value={jd}
                        onChange={(e) => setJD(e.target.value)}
                    />
                </label>

                <label className="input-group animate-slide-in-delay2">
                    <span className="bg-purple-700 text-base-100 font-semibold px-2">Qualification</span>
                    <input
                        type="text"
                        className="input input-bordered w-full text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                        placeholder="Qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                    />
                </label>

                <label className="input-group animate-slide-in-delay3">
                    <span className="bg-purple-700 text-base-100 font-semibold px-2">Skills</span>
                    <input
                        type="text"
                        className="input input-bordered w-full text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                        placeholder="Skill Set"
                        value={skillSet}
                        onChange={(e) => setSkillSet(e.target.value)}
                    />
                </label>

                <textarea
                    className="textarea textarea-bordered w-full mb-2 text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all animate-fade-in-delay3"
                    placeholder="Other Requirements"
                    value={otherReq}
                    onChange={(e) => setOtherReq(e.target.value)}
                ></textarea>

                <select
                    className="select select-bordered w-full placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-300 transition-all animate-fade-in"
                    value={jobType}
                    defaultValue="Job Type"
                    onChange={(e) => setJobType(e.target.value)}
                >
                    <option disabled>Job Type</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                    <option value="part time">Part Time</option>
                    <option value="full time">Full Time</option>
                </select>

                <label className="input-group animate-slide-in-delay4">
                    <span className="bg-purple-700 text-base-100 font-semibold px-2">Salary</span>
                    <input
                        type="text"
                        className="input input-bordered w-full text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                        placeholder="Salary Range"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                    />
                </label>

                <label className="input-group animate-slide-in-delay5">
                    <span className="bg-purple-700 text-base-100 font-semibold px-2">Address</span>
                    <input
                        type="text"
                        className="input input-bordered w-full text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>

                <button className="btn btn-primary w-full mt-4 animate-pulse transition-transform transform hover:scale-105" onClick={createNewJob}>
                    Create New Job
                </button>
            </div>
        </div>

    );
}