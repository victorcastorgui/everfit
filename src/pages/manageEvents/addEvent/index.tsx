import InputForm from "@/components/InputForm";
import { useState } from "react";

function AddEvent() {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(0);

  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] h-screen">
        <form action="">
          <label htmlFor="name">Event Name:</label>
          <InputForm
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter event name here..."
            id="name"
          />
          <label htmlFor="datetime">Date Time:</label>
          <InputForm
            type="datetime-local"
            onChange={(e) => setStartTime(e.target.value)}
            id="datetime"
          />
          <InputForm
            type="text"
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration here..."
          />
          <select onChange={(e) => setCategory(e.target.value)}>
            <option selected disabled>
              Select Category
            </option>
            <option value="marathon">Marathon</option>
            <option value="yoga">Yoga</option>
            <option value="cycling">Cycling</option>
            <option value="martial art">Martial Art</option>
            <option value="racket sports">racker sports</option>
            <option value="swimming">swimming</option>
            <option value="football">football</option>
          </select>
          <InputForm type="file" />
          <InputForm
            type="number"
            onChange={(e) => setPrice(parseInt(e.target.value))}
            placeholder="Enter price here..."
          />
          <textarea
            className="resize-none"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description here..."
          />
          <InputForm
            type="number"
            onChange={(e) => setCapacity(parseInt(e.target.value))}
            placeholder="Enter Capacity here..."
          />
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
