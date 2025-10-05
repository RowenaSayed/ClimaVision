import { useState, useEffect } from "react";
import profileImg from "../../assets/profile.png";

function Profile() {
  const [preview, setPreview] = useState(profileImg);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://weatherapi.runasp.net/api/UserProfile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        });
        setPreview(data.imageUrl || profileImg);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("phoneNumber", profile.phoneNumber);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("http://WeatherAPI.somee.com/api/UserProfile", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to update profile");
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center bg-[#0d1117] py-5 px-4">
      <section className="w-full max-w-md bg-[#161b22]/80 border border-[#00B8D9]/30 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          User Profile
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* <div className="flex flex-col items-center">
            <label
              htmlFor="profileImage"
              className="cursor-pointer flex flex-col items-center"
            >
              <img
                src={preview}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-[#00B8D9] mb-2 object-cover"
              />
              <span className="text-sm text-[#00B8D9] hover:underline">
                Change Photo
              </span>
            </label>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div> */}

          {["name", "email", "phoneNumber"].map((field) => (
            <div key={field}>
              <label className="block text-sm text-gray-300 mb-1">
                {field === "phoneNumber"
                  ? "Phone"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={profile[field]}
                onChange={handleInputChange}
                placeholder={`Enter your ${
                  field === "phoneNumber" ? "phone number" : field
                }`}
                className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-[#FF6B6B] to-[#00B8D9] py-2 rounded-lg text-white font-semibold transition-transform duration-150 hover:-translate-y-1 ${
              loading
                ? "opacity-50 cursor-not-allowed hover:translate-y-0"
                : "hover:opacity-90"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Profile;
