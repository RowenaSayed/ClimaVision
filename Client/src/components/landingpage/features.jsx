import React from "react";


function Features({ title, description, icon: Icon }) {
  return (
    <article className="transition-transform duration-300 bg-[#161B22]/70 hover:bg-[#a9b0b1]/20 hover:translate-y-[-5px]  hover:cursor-pointer border border-[#00B8D9]/20 rounded-xl p-6 text-center">
      <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B6B] to-[#00B8D9] rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </article>
  );
}

export default Features;
