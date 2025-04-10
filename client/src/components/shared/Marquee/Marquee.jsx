import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import boy1 from "../../../assets/boy (1).png"
import boy2 from "../../../assets/boy (2).png"
import boy3 from "../../../assets/boy.png"
import girl1 from "../../../assets/girl.png"
import girl2 from "../../../assets/woman (1).png"
import girl3 from "../../../assets/woman (2).png"


const reviews = [
  {
    name: "Sakshi",
    username: "@Sakshi",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: boy1,
  },
  {
    name: "Aditya",
    username: "@Aditya",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: boy2,
  },
  {
    name: "Arjun",
    username: "@Arjun",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: boy3,
  },
  {
    name: "Pratham",
    username: "@Pratham",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: girl1,
  },
  {
    name: "Pranav",
    username: "@Pranav",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: girl2,
  },
  {
    name: "Rudrani",
    username: "@Rudrani",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: girl3,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const MarqueeDemo = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
};

export default MarqueeDemo;