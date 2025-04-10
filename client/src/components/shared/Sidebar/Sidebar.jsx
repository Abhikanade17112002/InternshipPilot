// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import { Label } from "@radix-ui/react-label";
// // import { useState } from "react";

// // const FilterCard = ({ filtersarray, query, setQuery }) => {
// //   const [selectedValue, setSelectedValue] = useState("");
// //   const changeHandler = (value) => {
// //     setSelectedValue(value);
// //     setQuery(value);
// //   };

// //   return (
// //     <div className="w-full bg-white p-3 rounded-md">
// //       <h1 className="font-bold text-md">Filter Jobs</h1>
// //       <hr className="mt-3" />
// //       <RadioGroup value={selectedValue} onValueChange={changeHandler}>
// //         {filtersarray.map((data, index) => (
// //           <div key={index}>
// //             <h1 className="font-bold text-sm">{data.label}</h1>
// //             {data.value.map((item, idx) => {
// //               const itemId = `id${index}-${idx}`;
// //               return (
// //                 <div key={idx} className="flex items-center space-x-2 my-2">
// //                   <RadioGroupItem value={item} id={itemId} />
// //                   <Label className="text-sm" htmlFor={itemId}>
// //                     {item}
// //                   </Label>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ))}
// //       </RadioGroup>
// //     </div>
// //   );
// // };

// // export default FilterCard;




// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@radix-ui/react-label";
// import { useState, useEffect } from "react";

// const FilterCard = ({ filtersarray, query, setQuery }) => {
//   const [selectedValue, setSelectedValue] = useState(query);

//   useEffect(() => {
//     setSelectedValue(query);
//   }, [query]);

//   const changeHandler = (value) => {
//     setSelectedValue(value);
//     setQuery(value);
//   };

//   const clearFilter = () => {
//     setSelectedValue("");
//     setQuery("");
//   };

//   return (
//     <div className="w-full h-full bg-white p-3 rounded-md ">
//       <h1 className="font-bold text-md">Filter Jobs</h1>
//       <button
//         onClick={clearFilter}
//         disabled={!selectedValue}
//         className={`mt-3 px-3 py-1 text-sm font-bold rounded-md transition 
//           ${selectedValue ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
//       >
//         Clear Filter
//       </button>
//       <hr className="mt-3" />
//       <RadioGroup value={selectedValue} onValueChange={changeHandler} className="mt-2">
//         {filtersarray.map((data, index) => (
//           <div key={index} className="mt-2">
//             <h1 className="font-bold text-sm">{data.label}</h1>
//             {data.value.map((item, idx) => {
//               const itemId = `id${index}-${idx}`;
//               return (
//                 <div key={idx} className="flex items-center gap-2 mt-1">
//                   <RadioGroupItem value={item} id={itemId} />
//                   <Label htmlFor={itemId}>
//                     <span className="text-sm">{item}</span>
//                   </Label>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </RadioGroup>

//       {/* Clear Filter Button */}
    
//     </div>
//   );
// };

// export default FilterCard;




// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@radix-ui/react-label";
// import { useState, useEffect } from "react";
// import { X } from "lucide-react"; // Icon for Clear Button

// const FilterCard = ({ filtersarray, query, setQuery }) => {
//   const [selectedValue, setSelectedValue] = useState(query);

//   useEffect(() => {
//     setSelectedValue(query);
//   }, [query]);

//   const changeHandler = (value) => {
//     setSelectedValue(value);
//     setQuery(value);
//   };

//   const clearFilter = () => {
//     setSelectedValue("");
//     setQuery("");
//   };

//   return (
//     <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-5">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-lg font-semibold text-gray-800">Filter Jobs</h1>
//         {selectedValue && (
//           <button
//             onClick={clearFilter}
//             className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-red-600 transition"
//           >
//             <X className="w-4 h-4" />
//             Clear
//           </button>
//         )}
//       </div>

//       {/* Divider */}
//       <hr className="my-4 border-gray-300" />

//       {/* Filters */}
//       <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4">
//         {filtersarray.map((data, index) => (
//           <div key={index}>
//             <h2 className="text-sm font-medium text-gray-700">{data.label}</h2>
//             <div className="mt-2 space-y-2">
//               {data.value.map((item, idx) => {
//                 const itemId = `id${index}-${idx}`;
//                 return (
//                   <div key={idx} className="flex items-center gap-3">
//                     <RadioGroupItem value={item} id={itemId} />
//                     <Label htmlFor={itemId} className="text-sm text-gray-700 cursor-pointer">
//                       {item}
//                     </Label>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };

// export default FilterCard;




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
