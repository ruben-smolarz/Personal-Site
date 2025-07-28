import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 aspect-square">
      <img
        src="/profile.png"
        alt="Profile"
        draggable="false"
        className="object-cover w-full h-full border-4 rounded-full shadow-lg select-none aspect-square border-purple-500/30 shadow-purple-500/20"
        onMouseDown={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default ProfileImage;
