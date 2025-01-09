import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer";
import AlumniCard from "../components/AlumniCard.jsx";
import SignInPrompt from "./SignInPrompt"; // Import the SignInPrompt component

const Directory = () => {
	const [alumni, setAlumni] = useState([]);
	const [filters, setFilters] = useState({
		name: "",
		instituteId: "",
		graduationYear: "",
		company: "",
		role: "",
		branch: "",
		city: "",
	});
	const [filteredAlumni, setFilteredAlumni] = useState([]);
	const [graduationYears, setGraduationYears] = useState([]);
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState(localStorage.getItem("token")); // Get JWT token

	useEffect(() => {
		const fetchAlumni = async () => {
			try {
				const response = await axios.get(
					"https://alumportal-iiitkotaofficial.onrender.com/api/alumni"
					// "http://localhost:5000/api/alumni"
				);
				// console.log("Fetched Alumni Data:", response.data); // Log data
				setAlumni(response.data);
				setFilteredAlumni(response.data); // Set initial filtered list

				// Extract unique graduation years and sort them
				const years = [
					...new Set(response.data.map((alumnus) => alumnus.graduationYear)),
				];
				years.sort((a, b) => a - b); // Sort years in ascending order
				setGraduationYears(years);
			} catch (error) {
				console.error("Error fetching alumni data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAlumni();
	}, [token]);

	const handleFilterChange = (e) => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent default form submission
		const filtered = alumni.filter((alumnus) => {
			return (
				(filters.name
					? alumnus.name.toLowerCase().includes(filters.name.toLowerCase())
					: true) &&
				(filters.instituteId
					? alumnus.instituteId
							.toLowerCase()
							.includes(filters.instituteId.toLowerCase())
					: true) &&
				(filters.graduationYear
					? alumnus.graduationYear === filters.graduationYear
					: true) &&
				(filters.company
					? alumnus.currentCompany
							.toLowerCase()
							.includes(filters.company.toLowerCase())
					: true) &&
				(filters.role
					? alumnus.role.toLowerCase().includes(filters.role.toLowerCase())
					: true) &&
				(filters.branch
					? alumnus.branch.toLowerCase().includes(filters.branch.toLowerCase())
					: true) &&
				(filters.city
					? alumnus.city.toLowerCase().includes(filters.city.toLowerCase())
					: true)
			);
		});
		setFilteredAlumni(filtered);
		setShowFilterModal(false);
		console.log("Filters applied:", filters);
	};

	const handleReset = () => {
		setFilters({
			name: "",
			instituteId: "",
			graduationYear: "",
			company: "",
			role: "",
			branch: "",
			city: "",
		});
		setFilteredAlumni(alumni); // Reset the filtered list to show all alumni
	};

	const toggleFilterModal = () => {
		setShowFilterModal(!showFilterModal); // Toggle filter modal visibility
	};

	return (
		<div className="flex flex-col w-screen h-screen bg-gray-100 ">
			<Navbar />
			<div className="h-[99vh] overflow-y-scroll scrollbar-hide mt-[9rem] max-w-980:mt-[100px] max-w-492:mt-[75px] md:px-2">
				<div className="w-full h-full flex md:gap-4">
					<div className="xl:w-[20%] w-0 xl:h-[70vh] md:h-[85vh] lg:h-[70vh] flex flex-col gap-4 xl:mt-2">
						<div className="mb-4 xl:mb-6 hidden xl:block">
							<div className="text-2xl 3xl:text-4xl font-bold text-gray-800">
								Add Filters
							</div>
							<div className="border-b-2 border-teal-500 w-20 mt-1"></div>
						</div>
						<form
							onSubmit={handleSubmit}
							className="xl:flex hidden flex-col gap-4 3xl:gap-6"
						>
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={filters.name}
								onChange={handleFilterChange}
								className="h-12 3xl:h-16 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
							/>
							<input
								type="text"
								name="instituteId"
								placeholder="Institute ID"
								value={filters.instituteId}
								onChange={handleFilterChange}
								className="h-12 3xl:h-16 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
							/>
							<select
								name="graduationYear"
								value={filters.graduationYear}
								onChange={handleFilterChange}
								className="h-12 3xl:h-16 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
							>
								<option value="">Select Graduation Year</option>
								{graduationYears.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
							<input
								type="text"
								name="company"
								placeholder="Company"
								value={filters.company}
								onChange={handleFilterChange}
								className="h-12 3xl:h-16 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
							/>
							<input
								type="text"
								name="role"
								placeholder="Role"
								value={filters.role}
								onChange={handleFilterChange}
								className="h-12 3xl:h-16 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
							/>
							<input
								type="text"
								name="branch"
								placeholder="Branch"
								value={filters.branch}
								onChange={handleFilterChange}
								className="h-12 3xl:h-16 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
							/>
							<input
								type="text"
								name="city"
								placeholder="City"
								value={filters.city}
								onChange={handleFilterChange}
								className="h-12 3xl:h-16 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
							/>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={handleReset}
									className="w-1/2 h-12 3xl:h-16 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
								>
									Reset
								</button>
								<button
									type="submit"
									className="w-1/2 h-12 3xl:h-16 bg-blue-950 text-white font-semibold rounded-lg hover:bg-[#19194D] transition-all duration-300 ease-in-out"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
					<div className="xl:w-[80%] w-full flex flex-col gap-2 h-full pb-1">
						<div className="w-full h-auto bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
							<p className="text-lg font-semibold text-gray-800">
								Found {filteredAlumni.length} alumni
							</p>
							<button
								onClick={toggleFilterModal}
								className="bg-blue-950 text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#19194D] xl:hidden"
							>
								Toggle Filters
							</button>
						</div>

						{showFilterModal && (
							<div className="fixed inset-0 z-50 flex items-center justify-center">
								<div
									className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
									onClick={toggleFilterModal}
								></div>
								<div className="bg-white p-6 rounded-lg shadow-lg z-10 w-11/12 max-w-md relative">
									<button
										onClick={toggleFilterModal}
										className="absolute top-2 right-2 text-4xl text-gray-600 hover:text-gray-800"
									>
										&times;
									</button>
									<h2 className="text-2xl font-semibold text-gray-800 mb-4">
										Filter Alumni
									</h2>
									<form onSubmit={handleSubmit} className="flex flex-col gap-4">
										<input
											type="text"
											name="name"
											placeholder="Name"
											value={filters.name}
											onChange={handleFilterChange}
											className="h-12 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
										/>
										<input
											type="text"
											name="instituteId"
											placeholder="Institute ID"
											value={filters.instituteId}
											onChange={handleFilterChange}
											className="h-12 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
										/>
										<select
											name="graduationYear"
											value={filters.graduationYear}
											onChange={handleFilterChange}
											className="h-12 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
										>
											<option value="">Select Graduation Year</option>
											{graduationYears.map((year) => (
												<option key={year} value={year}>
													{year}
												</option>
											))}
										</select>
										<input
											type="text"
											name="company"
											placeholder="Company"
											value={filters.company}
											onChange={handleFilterChange}
											className="h-12 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
										/>
										<input
											type="text"
											name="role"
											placeholder="Role"
											value={filters.role}
											onChange={handleFilterChange}
											className="h-12 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
										/>
										<input
											type="text"
											name="branch"
											placeholder="Branch"
											value={filters.branch}
											onChange={handleFilterChange}
											className="h-12 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
										/>
										<input
											type="text"
											name="city"
											placeholder="City"
											value={filters.city}
											onChange={handleFilterChange}
											className="h-12 px-4 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#19194D]"
										/>
										<div className="flex gap-2">
											<button
												type="button"
												onClick={handleReset}
												className="w-1/2 h-12 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
											>
												Reset
											</button>
											<button
												type="submit"
												className="w-1/2 h-12 bg-blue-950 text-white font-semibold rounded-lg hover:bg-[#19194D] transition-all duration-300 ease-in-out"
											>
												Submit
											</button>
										</div>
									</form>
								</div>
							</div>
						)}
						<div className="w-full h-full overflow-y-scroll scrollbar-hide flex flex-wrap gap-4 justify-center">
							{loading ? (
								<div className="h-full w-full flex justify-center items-center bg-white rounded-tr-md rounded-tl-md">
									<div className="flex flex-col items-center">
										<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
										<p className="text-gray-700 mt-4">Loading...</p>
									</div>
								</div>
							) : filteredAlumni.length == 0 ? (
								<div className="h-full w-full flex justify-center items-center bg-white rounded-tr-md rounded-tl-md">
									<p>No alumni found</p>
								</div>
							) : (
								<div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
									{filteredAlumni.map((alumnus) => (
										<AlumniCard key={alumnus._id} alumniData={alumnus} />
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* <Footer /> */}
		</div>
	);
};

export default Directory;
