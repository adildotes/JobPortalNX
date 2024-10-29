"use client";

import { auth, db, storage } from "@/firebase/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobSeekerInfo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState<File>();
  const [resume, setResume] = useState<File>();

  const [picURL, setPicURL] = useState("");
  const [resumeURL, setResumeURL] = useState("");

  const route = useRouter();

  const uploadFiles = () => {
    if (!name || !description || !address || !phone || !pic || !resume) return;
    uploadPic();
    uploadResume();
  };

  const saveJobSeekerInfo = async () => {
    const jobSeeker = {
      name,
      description,
      address,
      phone,
      pic: picURL,
      resume: resumeURL,
    };
    let docId = auth.currentUser?.uid;
    let userRef = doc(db, "users", docId!);

    try {
      await setDoc(userRef, jobSeeker, { merge: true });
      route.push("/jobseeker");
    } catch (e) {
      console.log(e);
    }
  };

  const uploadPic = () => {
    const storageRef = ref(storage, `jobseekerimages/${makeImageName()}`);
    const uploadTask = uploadBytesResumable(storageRef, pic!);
    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setPicURL(downloadURL);
        });
      }
    );
  };
  const uploadResume = () => {
    const storageRef = ref(storage, `resume/${makeImageName()}`);
    const uploadTask = uploadBytesResumable(storageRef, resume!);
    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setResumeURL(downloadURL);
        });
      }
    );
  };

  const makeImageName = () => {
    let imageName = pic?.name.split(".");
    let lastIndex = imageName!?.length - 1;
    let imageType = imageName![lastIndex];
    let newName = `${auth.currentUser?.uid}.${imageType}`;
    return newName;
  };

  useEffect(() => {
    console.log(picURL, "=======", resumeURL);
    if (picURL && resumeURL) {
      saveJobSeekerInfo();
    }
  }, [picURL, resumeURL]);

  return (
    <div className="flex flex-col justify-center items-center mt-20 space-y-6">
      <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text filter drop-shadow-lg mb-2">
        Job Seeker Information
      </h1>
      <p className="text-gray-600 text-lg mb-4">Please complete your profile.</p>

      <div className="card bg-gradient-to-br from-indigo-100 to-purple-200 w-96 shadow-2xl gap-4 p-6 rounded-lg transform transition-transform hover:scale-105">
        <label className="input input-bordered flex items-center gap-2 mb-2">
          <input
            type="text"
            className="grow text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-blue-300 transition-all"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          <input
            type="text"
            className="grow text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-blue-300 transition-all"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          <input
            type="text"
            className="grow text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-blue-300 transition-all"
            placeholder="Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          <input
            type="text"
            className="grow text-base bg-white placeholder-gray-500 focus:ring-2 focus:ring-blue-300 transition-all"
            placeholder="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          <span className="font-medium text-gray-700">Upload Picture:</span>
          <input
            type="file"
            className="file-input w-full bg-white placeholder-gray-500 focus:ring-2 focus:ring-blue-300 transition-all"
            onChange={(e) => {
              let files = e.target.files;
              if (files?.length) {
                setPic(files[0]);
              }
            }}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          <span className="font-medium text-gray-700">Upload Resume:</span>
          <input
            type="file"
            className="file-input w-full bg-white placeholder-gray-500 focus:ring-2 focus:ring-blue-300 transition-all"
            onChange={(e) => {
              let files = e.target.files;
              if (files?.length) {
                setResume(files[0]);
              }
            }}
          />
        </label>

        <button className="btn btn-primary w-full mt-4 transform transition-transform hover:scale-105 shadow-lg shadow-blue-300/50" onClick={uploadFiles}>
          Save Job Seeker Details
        </button>
      </div>
    </div>

  );
}