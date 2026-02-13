import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

function App() {
	return (
		<div className="bg-black min-h-screen">
			<Navbar />
			<main>
				<Hero />
				<Services />
				<About />
				<Contact />
			</main>
			<Footer />
		</div>
	);
}

export default App;
