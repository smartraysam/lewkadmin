import React from "react";

interface Props {
  name: string;
  onClick?: () => void;
}

const StoreItem: React.FC<Props> = ({ name, onClick }) => {
  return (
    <div
      className="mx-1 my-2 rounded-md border border-gray-200 hover:cursor-pointer"
      onClick={onClick}
    >
      <p className="p-2">{name}</p>
    </div>
  );
};

export default StoreItem;
