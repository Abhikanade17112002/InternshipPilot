
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  "FrontEnd Developer",
  "BackEnd Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "UI/UX Designer",
  "Cloud Engineer",
  "Mobile Developer",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    navigate(`/jobs/browse/${query}`);
  };

  return (
    <div className="w-full py-6 px-2 sm:px-4">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-[130px] sm:basis-[160px] md:basis-[180px] lg:basis-[200px] flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full w-full text-xs sm:text-sm whitespace-nowrap"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-5" />
        <CarouselNext className="-right-5" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
