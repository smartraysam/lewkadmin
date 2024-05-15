import React from "react";

interface Props {
  name: string;
  onClick?: () => void;
  selected?: boolean;
}

const StoreItem: React.FC<Props> = ({ name, onClick, selected }) => {
  return (
    <div
      className={`${selected ? "bg-gray-400" : ""}mx-1 my-2 rounded-md border border-gray-200 hover:cursor-pointer hover:bg-gray-400 hover:text-white`}
      onClick={onClick}
    >
      <p className="p-2">{name}</p>
    </div>
  );
};

export default StoreItem;
