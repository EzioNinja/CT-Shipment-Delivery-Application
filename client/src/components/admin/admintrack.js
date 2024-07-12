import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { trackUserShipment } from "./adminutil/api";

const adminTrack = () => {
  const [trackDetails, setTrackDetails] = useState(false);
  const [trackInput, setTrackInput] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState({});
  const [updates, setUpdates] = useState({});

  const trackShipment = async (e) => {
    e.preventDefault();
    
    if (trackInput.trim() === "") {
      toast.error("Please enter a valid tracking ID");
      return;
    }
    
    try {
      const response = await trackUserShipment(trackInput);
      if (response.data.success) {
        toast.success(response.data.message);
        const { shipment, updates } = response.data;
        setTrackDetails(true);
        setShipmentDetails(shipment[0]);
        setUpdates(updates);
        setTrackInput("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while tracking the shipment");
    }
  };

  return (
    <div className="">
      <div style={{ maxWidth: "700px", margin: "100px auto" }}>
        <form className="flex items-center" onSubmit={trackShipment}>
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 rounded-sm focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" Track ID......."
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white rounded-md hover:border hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="mr-2 -ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            Track
          </button>
        </form>
      </div>

      {trackDetails && (
        <div className="">
          <div
            className="bg-gray-700 border rounded-lg overflow-hidden w-full"
            style={{ backgroundImage: "url(./images/landingpage/track.jpg)" }}
          >
            <h1 className="text-center text-indigo-600 text-2xl font-semibold m-4">
              Shipment Details
            </h1>
            <div className="flex justify-evenly p-6">
              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">Track ID:</p>
                <p className="text-white text-xl">{updates?.TrackID}</p>
              </div>
              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">PickUp Date:</p>
                <p className="text-white text-xl">{updates?.pickupdate}</p>
              </div>
              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">Delivered Date:</p>
                <p className="text-white text-xl">{updates?.deliverydate}</p>
              </div>
              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">From Address:</p>
                <p className="text-white text-xl">{shipmentDetails?.fromaddress}</p>
              </div>
              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">To Address:</p>
                <p className="text-white text-xl">{shipmentDetails?.toaddress}</p>
              </div>
              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">Shipment Status:</p>
                <p className="text-indigo-600 font-semibold">{updates?.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default adminTrack;
