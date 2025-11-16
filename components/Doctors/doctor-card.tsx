import React from "react";

const DoctorCard = ({ name, specialization, available, onProfileClick }) => {
  return (
    <div className="bg-gray-400 shadow-md p-4 rounded-xl border border-gray-100 flex flex-col gap-3 w-full max-w-sm">
      
   
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>

  
      <p className="text-gray-600">{specialization}</p>


      <span
        className={`px-3 py-1 text-sm font-medium rounded-full w-fit ${
          available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {available ? "Available for Appointments" : "Not Available"}
      </span>


      <button
        onClick={onProfileClick}
        className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Profile
      </button>
    </div>
  );
};

export default DoctorCard;
