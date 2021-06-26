import React, { useEffect, useRef, useState } from "react";
import { DragContext } from "../context/DragContext";
import PropTypes from "prop-types";

export const DragButton = ({ data }) => {
  const { setData } = React.useContext(DragContext);
  const [list, setList] = useState(data);
  const [selected, setSelected] = useState(false);
  const [isDrag, setIsdrag] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dEnd", handleDragEnd);
    setTimeout(() => {
      setIsdrag(true);
    }, 0);
  };

  const handleDragEnd = (e, params) => {
    dragNode.current.removeEventListener("dEnd", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    setIsdrag(false);
    setData(list[params]);
  };

  const handleDragEnter = (e, params) => {
	setSelected(params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList.splice(params, 0, newList.splice(currentItem, 1)[0]);
        dragItem.current = params;
        return newList;
      });
    }
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (currentItem === params) {
      return "w-5/6 h-10 bg-white mt-3 justify-center items-center flex rounded-md border-2 border-blue-700 mx-auto cursor-pointer";
    } else {
      return `w-5/6 h-10 bg-blue-600 mt-3 justify-center items-center flex rounded-md border-2 border-blue-700 mx-auto cursor-pointer`;
    }
  };

  return (
    <div>
      {list.map((item, index) => (
        <div
          key={item.title}
          draggable
          onDragEnter={isDrag ? (e) => handleDragEnter(e, index) : null}
          onDragEnd={(e) => handleDragEnd(e, index)}
          onDragStart={(e) => handleDragStart(e, index)}
          className={
            isDrag
              ? getStyles(index)
              : `w-5/6 h-10 ${
                  selected === index ? "bg-white" : "bg-blue-600"
                } text- mt-3 justify-center items-center flex rounded-md border-2 border-blue-700 mx-auto cursor-pointer`
          }
        >
          <p
            className={
              selected === index
                ? "text-blue-600 font-normal text-md"
                : "text-gray-50 font-normal text-md"
            }
          >
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

DragButton.propTypes = {
  data: PropTypes.array,
};

DragButton.defaultProps = {
  data: [],
};
