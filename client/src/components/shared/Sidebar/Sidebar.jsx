
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";
import { X } from "lucide-react"; // Icon for Clear Button

const FilterCard = ({ filtersarray, query, setQuery }) => {
  const [selectedValue, setSelectedValue] = useState(query);

  useEffect(() => {
    setSelectedValue(query);
  }, [query]);

  const changeHandler = (value) => {
    setSelectedValue(value);
    setQuery(value);
  };

  const clearFilter = () => {
    setSelectedValue("");
    setQuery("");
  };

  return (
    <div className="w-full h-full bg-white/80 backdrop-blur-lg py-4 px-4 flex flex-col">
      {/* Header */}
      <div className="flex  justify-between items-center pb-2 border-b border-gray-300">
        <h1 className="text-xl font-semibold text-gray-900">Filter Jobs</h1>
        {selectedValue && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-red-600 transition"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Filters Section */}
      <div className="mt-4 px-2 flex-1 overflow-y-auto">
        <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-5">
          {filtersarray.map((data, index) => (
            <div key={index}>
              <h2 className="text-sm font-medium text-gray-700 uppercase">{data.label}</h2>
              <div className="mt-2 space-y-2">
                {data.value.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="border-gray-400 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                      />
                      <Label htmlFor={itemId} className="text-sm text-gray-800 cursor-pointer hover:font-bold transition">
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
