import React from 'react'

export const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C1037] p-4">
      <div className="w-full max-w-4xl mx-auto mb-40 overflow-hidden rounded-lg shadow-2xl">
        {/* Video 1 - Con contenedor para relación de aspecto */}
        <div className="relative pb-[46.25%] mb-4 "> {/* 16:9 aspect ratio */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="./src/assets/1122.mp4"
          />
        </div>
        
        {/* Video 2 - Mismo enfoque */}
        <div className="relative pb-[26.25%]"> {/* 16:9 aspect ratio */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="./src/assets/Comp 2.mp4"
          />
        </div>
          <div className="font-montserrat bg-[#0C1037] text-white">
  <h1 className="text-4xl font-bold">Página en proceso de desarrollo</h1>
  <p className="font-medium">Te damos gracias por visitarnos. cordialmente el equipo 1122</p>
</div>
      </div>
    </div>
  );
};