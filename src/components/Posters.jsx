import { FaStar } from "react-icons/fa";

export default function Posters({ title, rating, category, image, synopsis }) {
  return (
    <div className="text-white mx-auto border border-slate-800 rounded-lg bg-gray-700">
      <div className="px-6 py-8">
        <h3 className="font-black font-poppins text-xl text-red-500 mb-4">
          {title}
        </h3>
        <div className="flex flex-row items-center justify-between mb-6">
          <section className="flex items-center gap-3 text-lg text-orange-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </section>

          <span className="font-bold text-xl font-poppins">{rating}</span>
        </div>
        <p className="mb-6 text-lg font-syne">{category}</p>
        <p className="font-syne tracking-tight text-gray-400">{synopsis}</p>
      </div>

      <div className="overflow-hidden h-98">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full aspect-auto object-cover"
        />
      </div>
    </div>
  );
}
