import Animebanner from "../assets/Animebanner.jpg";
import { motion } from "motion/react";
import Posters from "../components/Posters";
import BlackClover from "../assets/Black Clover.jpg";
import Bleach from "../assets/Bleach.jpg";
import CowboyBebop from "../assets/Cowboy Bebop.jpg";
import DanDanDan from "../assets/Dan Dan Dan.jpg";
import JJK from "../assets/JJK.jpg";
import MobPsycho from "../assets/Mob Psycho.jpg";
import OnePiece from "../assets/One Piece.jpg";
import Trigun from "../assets/Trigun.jpg";
import Onepunchman from "../assets/One Punch Man.jpg";

export default function Home() {
  const posters = [
    {
      id: 0,
      title: "Cowboy Bebop",
      rating: "8.7",
      category: "Sci-Fi",
      image: CowboyBebop,
      synopsis:
        "In 2071, a ragtag crew of bounty hunters travel aboard the spaceship Bebop searching for high-risk targets across the solar system.",
    },
    {
      id: 1,
      title: "Trigun",
      rating: "8.2",
      category: "Action",
      image: Trigun,
      synopsis:
        "Vash the Stampede is a legendary gunfighter on a desert planet with a huge bounty on his head. Watch out for his incredible journey.",
    },
    {
      id: 2,
      title: "One Piece",
      rating: "8.4",
      category: "Adventure",
      image: OnePiece,
      synopsis:
        "Monkey D. Luffy sets out with his pirate crew to discover the ultimate treasure known as the 'One Piece'.",
    },
    {
      id: 3,
      title: "Bleach",
      rating: "7.9",
      category: "Action",
      image: Bleach,
      synopsis:
        "Ichigo Kurosaki gains the powers of a Soul Reaper and must protect humans from evil spirits.",
    },
    {
      id: 4,
      title: "Dandadan",
      rating: "8.6",
      category: "Supernatural",
      image: DanDanDan,
      synopsis:
        "Momo Ayase and Ken Takakura team up to investigate extraterrestrials and paranormal occurrences.",
    },
    {
      id: 5,
      title: "Black Clover",
      rating: "8.1",
      category: "Action",
      image: BlackClover,
      synopsis:
        "Asta, a young boy born without magical powers in a world where magic is everything, aims to become the Wizard King.",
    },
    {
      id: 6,
      title: "Jujutsu Kaisen",
      rating: "8.5",
      category: "Action",
      image: JJK,
      synopsis:
        "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse which is called Sukuna. Gojo Saturao is sealed, it's to Yuji and Yuta to save Shibuya.",
    },
    {
      id: 7,
      title: "Mob Psycho",
      rating: "8.5",
      category: "Supernatural",
      image: MobPsycho,
      synopsis:
        "Shigeo Kayeyama, an 8th grader with powerful psychic abilities, tries to live a normal life while supressing his emotional powers under a fradulent psychic mentor.",
    },
    {
      id: 8,
      title: "One Punch Man",
      rating: "8.3",
      category: "Action",
      image: Onepunchman,
      synopsis:
        "Saitama has become so powerful that he can defeat any enemy with a single punch, leading to a hilarious existential crisis as he searches for a worthy opponent.",
    },
  ];
  return (
    <div className="mt-16">
      <div className="text-white flex flex-col lg:flex-row justify-center items-center mx-6 mb-16 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: "easeOut", duration: 1.8 }}
          className="flex flex-col gap-8 mx-4 max-w-xl "
        >
          <h1 className="font-poppins font-black text-red-500 text-2xl tracking-tight md:text-4xl">
            Track, Stream, and Discover Anime.
          </h1>
          <p className="font-syne font-normal leading-relaxed text-gray-400 text-sm md:text-lg">
            AniVault brings you trending shows, instant search , and trailer
            playback in one lightweight, distraction-free space.
          </p>
        </motion.div>

        <div className="overflow-hidden w-full lg:w-full">
          <img
            src={Animebanner}
            alt="anime wallpaper"
            loading="lazy"
            className="w-full h-98 rounded-lg object-cover"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", transition: 2.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mx-6 lg:mx-10 mt-40 mb-24"
      >
        {posters.map((poster) => (
          <Posters
            key={poster.id}
            title={poster.title}
            rating={poster.rating}
            category={poster.category}
            synopsis={poster.synopsis}
            image={poster.image}
          />
        ))}
      </motion.div>
    </div>
  );
}
