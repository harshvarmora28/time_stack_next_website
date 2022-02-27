import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function index() {
  return (
    <>
      <Head>
        <title>Time Stack - Pomodoro</title>
        <link rel="icon" href="time_stack_logo_without_text.png"/>
      </Head>

	  
      <div className="bg-gray-900 min-h-screen font-inter" style={{backgroundColor: "#110026"}}>
        <div className="max-w-4xl min-h-screen mx-auto">
          <Navbar />
        </div>
      </div>
    </>
  );
}
