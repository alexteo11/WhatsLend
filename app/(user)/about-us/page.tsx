"use client";

import React from "react";
import { Button } from "@/app/components/lib/button";

const AboutUs = () => {
  // Using fetch
  async function callAPI() {
    try {
      const response = await fetch(
        "http://127.0.0.1:5001/compareloan-f6d21/asia-southeast1/loan",
        {
          method: "GET", // or POST
          credentials: "include", // Required for cookies/sessions
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmVHJ1b3ZWSmZlZlBTSXVQeHZLRm9CMjNZOEEzIiwiZW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MDU4ODg0OCwiZXhwIjoxNzUwNTg5MTQ4fQ.OoXNHnA9vSu4l1Ah1TBVmu7E7-rBzmUadh747zmtUhY", // If using auth
          },
        },
      );

      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("API Error:", error);
    }
  }
  return (
    <div className="middle-container-width user-page-title py-8 md:py-14">
      About Us
      <Button onClick={() => callAPI()}>Test</Button>
    </div>
  );
};

export default AboutUs;
