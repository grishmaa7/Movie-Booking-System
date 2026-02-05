import { useParams } from "react-router-dom";
import { useState } from "react";

const MOVIES = [
  {
    id: "movie_1",
    title: "Inception",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    description:
      "A skilled thief, Dom Cobb, enters people's dreams to steal secrets. As he navigates layered dream worlds, reality blurs and every choice carries consequences, challenging the boundaries between consciousness and imagination."
  },
  {
    id: "movie_2",
    title: "The Dark Knight",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    description:
      "Batman confronts the Joker, a criminal mastermind spreading chaos through Gotham City. The story explores moral ambiguity, justice versus vengeance, and the psychological toll of heroism in a corrupt society."
  },
  {
    id: "movie_3",
    title: "Interstellar",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    description:
      "A team of astronauts ventures through a mysterious wormhole in search of a new home for humanity. Amidst cosmic phenomena and time dilation, love, sacrifice, and survival intertwine in this epic journey across space."
  },
  {
    id: "movie_4",
    title: "Avengers Endgame",
    trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
    description:
      "The Avengers unite for one final battle to undo the devastation caused by Thanos’ snap. Friendship, heroism, and ultimate sacrifices are at the heart of this epic culmination of the Marvel saga."
  },
  {
    id: "movie_5",
    title: "Parasite",
    trailer: "https://www.youtube.com/embed/5xH0HfJHsaY",
    description:
      "A dark social satire depicting a poor family's infiltration into a wealthy household. Secrets, tension, and morality collide in a gripping story of class divide, deception, and survival."
  },
  {
    id: "movie_6",
    title: "Joker",
    trailer: "https://www.youtube.com/embed/zAGVQLHvwOY",
    description:
      "Arthur Fleck, a struggling comedian, descends into madness as society neglects him. Exploring mental illness, isolation, and societal pressures, this story examines the birth of one of Gotham's most notorious villains."
  },
  {
    id: "movie_7",
    title: "Dune",
    trailer: "https://www.youtube.com/embed/n9xhJrPXop4",
    description:
      "Paul Atreides becomes central to a galactic struggle over Arrakis, a desert planet holding the universe’s most valuable resource. Politics, destiny, and survival intertwine in this visually stunning sci-fi epic."
  },
  {
    id: "movie_8",
    title: "Titanic",
    trailer: "https://www.youtube.com/embed/kVrqfYjkTdQ",
    description:
      "A tragic romance unfolds aboard the ill-fated RMS Titanic. Jack and Rose navigate love, class struggles, and fate amidst one of history’s most infamous maritime disasters."
  },
  {
    id: "movie_9",
    title: "Oppenheimer",
    trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
    description:
      "J. Robert Oppenheimer, the father of the atomic bomb, faces moral dilemmas as science collides with history. Power, responsibility, and the consequences of innovation define this gripping biographical drama."
  },
  {
    id: "movie_10",
    title: "The Batman",
    trailer: "https://www.youtube.com/embed/mqqft2x_Aa4",
    description:
      "A young Batman investigates corruption and a series of murders in Gotham City. Dark, gritty, and suspenseful, the story explores justice, vengeance, and the detective skills of the caped crusader."
  }
];

const theatres = [
  { name: "QFX", times: ["10:00 AM", "1:30 PM", "5:00 PM"] },
  { name: "FCube", times: ["11:00 AM", "3:00 PM", "7:00 PM"] },
  { name: "Big Movies", times: ["12:00 PM", "4:30 PM", "8:30 PM"] }
];

export default function MovieDetails() {
  const { id } = useParams();
  const movie = MOVIES.find(m => m.id === id);
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  if (!movie) return <p className="text-yellow-400 p-10">Movie not found 😭</p>;

  return (
    <div className="min-h-screen bg-[#202A44] text-white p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2">
        <iframe
          src={movie.trailer}
          title={movie.title}
          allowFullScreen
          className="w-full h-[360px] rounded-xl border border-yellow-400"
        />

        <h1 className="text-3xl font-bold text-yellow-400 mt-6">
          {movie.title}
        </h1>

        <p className="text-yellow-200 mt-4 leading-relaxed text-lg">
          {movie.description}
        </p>
      </div>

      {/* RIGHT SIDE - Now Showing */}
      <div className="bg-[#1B2540] border border-yellow-400 rounded-2xl p-6 flex flex-col justify-between h-[600px]">
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
            Now Showing
          </h2>

          {!selectedTheatre && (
            <select
              className="w-full text-lg font-semibold bg-[#202A44] border border-yellow-400 rounded-2xl px-6 py-3 mb-4 hover:bg-[#1E3250] transition-all"
              onChange={(e) =>
                setSelectedTheatre(theatres.find(t => t.name === e.target.value))
              }
            >
              <option value="">Choose Theatre</option>
              {theatres.map((t, i) => (
                <option key={i} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          )}

          {selectedTheatre && (
            <div className="mt-2">
              <p className="text-yellow-300 mb-3 font-medium">{selectedTheatre.name} Showtimes</p>

              <div className="flex flex-wrap gap-3">
                {selectedTheatre.times.map((time, i) => (
                  <span
                    key={i}
                    className="border border-yellow-400 px-4 py-1 rounded-lg text-sm text-yellow-200"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Buy Tickets Button pinned to bottom */}
        <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-300 text-[#202A44] font-bold py-3 rounded-2xl text-lg shadow-lg transition-all transform hover:scale-105">
          Buy Tickets 🎟
        </button>
      </div>

    </div>
  );
}
