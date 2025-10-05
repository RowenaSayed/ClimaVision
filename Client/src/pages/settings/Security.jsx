import React from "react";

function Security() {
  return (
    <main className="flex items-center justify-center bg-[#0d1117] py-5 px-4">
      <section className="w-full max-w-md bg-[#161b22]/80 border border-[#00B8D9]/30 rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">
          Change Password
        </h2>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm text-gray-300 mb-2"
            >
              Current Password
            </label>
            <input
              type="password"
              id="oldPassword"
              placeholder="Type your current password"
              className="w-full px-3 py-2 rounded-lg bg-[#0d1117] border border-[#00B8D9]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm text-gray-300 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Type a new password"
              className="w-full px-3 py-2 rounded-lg bg-[#0d1117] border border-[#00B8D9]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
            />
          </div>

          <button
            type="submit"
            className="w-full hover:cursor-pointer bg-gradient-to-r from-[#FF6B6B] to-[#00B8D9] py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-transform duration-150 hover:-translate-y-1"
          >
            Save New Password
          </button>
        </form>
      </section>
    </main>
  );
}

export default Security;
