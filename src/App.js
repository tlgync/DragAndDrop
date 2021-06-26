import React from "react";
import { DragButton } from "./components/DragButton";
import { DragContext } from "./context/DragContext";
import "./App.css";
const jsonData = [
  { title: "Drag and Drop1", data: "d&d 1" },
  { title: "Drag and Drop2", data: "d&d 2" },
  { title: "Drag and Drop3", data: "d&d 3" },
  { title: "Drag and Drop4", data: "d&d 4" },
  { title: "Drag and Drop5", data: "d&d 5" },
  { title: "Drag and Drop6", data: "d&d 6" },
  { title: "Drag and Drop7", data: "d&d 7" },
];

function App() {
  const { data } = React.useContext(DragContext);
  return (
      <div className="container mx-auto flex h-screen p-5 ">
        <div className="w-1/3 bg-blue-400 border-2 border-blue-700 flex-wrap ">
          <DragButton data={jsonData} />
        </div>
        <div className="w-2/3 border-2 border-gray-400 ml-1 flex justify-center">
          <span className="mt-2 text-blue-500 font-bold">
            {JSON.stringify(data)}
          </span>
        </div>
      </div>
  );
}

export default App;
