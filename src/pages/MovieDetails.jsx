import { useParams } from "react-router-dom";
import { useState } from "react";

// Movie Data
const movies = [
  { id: "1", title: "Inception", poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", trailer: "https://www.youtube.com/embed/YoHD9XEInc0", description: "Inception is a mind-bending science fiction thriller directed by Christopher Nolan. The story follows Dom Cobb, a skilled thief who specializes in extracting secrets from deep within the subconscious during dreams. Cobb is offered a chance to erase his criminal past by performing an impossible task called inception. As layers of dreams stack upon one another, reality begins to blur. The film explores time, memory, guilt, and the power of ideas. With stunning visuals and a gripping score, Inception challenges the audience to question what is real." },
  { id: "2", title: "Oppenheimer", poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", trailer: "https://www.youtube.com/embed/uYPbbksJxIg", description: "Oppenheimer is a historical drama that tells the story of J. Robert Oppenheimer, the brilliant physicist behind the creation of the atomic bomb. The film explores his role in the Manhattan Project and the moral consequences of his invention. As the world changes forever, Oppenheimer struggles with guilt, power, and responsibility. The narrative moves between science, politics, and personal conflict. It is a deep and emotional portrayal of ambition and its cost." },
  { id: "3", title: "The Dark Knight", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", trailer: "https://www.youtube.com/embed/EXeTwQWrcwY", description: "The Dark Knight follows Batman as he faces his greatest enemy, the Joker. Gotham City descends into chaos as the Joker challenges Batman’s sense of justice and morality. The film explores themes of order versus chaos and heroism versus corruption. Heath Ledger delivers a legendary performance as the Joker. With intense action sequences and emotional depth, this movie redefined the superhero genre." },
  { id: "4", title: "Interstellar", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", trailer: "https://www.youtube.com/embed/zSWdZVtXT7E", description: "Interstellar is a visually stunning science fiction epic about humanity’s fight for survival. A group of astronauts travels through a wormhole in search of a new home for mankind. The film explores time dilation, love, sacrifice, and space exploration. Scientific concepts are blended with emotional storytelling. It is both an intellectual and emotional journey across the universe." },
  { id: "5", title: "Avengers Endgame", poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg", trailer: "https://www.youtube.com/embed/TcMBFSGVi1c", description: "Avengers Endgame concludes the epic Infinity Saga of the Marvel Cinematic Universe. The Avengers reunite to undo the devastation caused by Thanos. The film is packed with emotional moments, heroic sacrifices, and epic battles. It celebrates friendship, loss, and redemption. Endgame serves as a powerful farewell to many beloved characters." },
  { id: "6", title: "Parasite", poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", trailer: "https://www.youtube.com/embed/5xH0HfJHsaY", description: "Parasite is a dark social satire that explores class inequality in modern society. The film follows a poor family that slowly infiltrates a wealthy household. As secrets unravel, tension builds toward an explosive climax. The story blends humor, suspense, and tragedy. Parasite offers a sharp critique of social divisions." },
  { id: "7", title: "Joker", poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", trailer: "https://www.youtube.com/embed/zAGVQLHvwOY", description: "Joker tells the origin story of Arthur Fleck, a failed comedian who descends into madness. Set in a decaying Gotham City, the film explores mental illness, isolation, and society’s neglect. Arthur’s transformation into Joker is both tragic and disturbing. Joaquin Phoenix delivers a haunting performance. The movie challenges viewers with its dark realism." },
  { id: "8", title: "Gladiator", poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", trailer: "https://www.youtube.com/embed/owK1qxDselE", description: "Gladiator follows Maximus, a Roman general betrayed by a corrupt emperor. Forced into slavery, he rises as a gladiator seeking revenge. The film explores honor, loyalty, and justice. Epic battles and emotional storytelling define the movie. It is a timeless tale of strength and sacrifice." },
  { id: "9", title: "The Shawshank Redemption", poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", trailer: "https://www.youtube.com/embed/6hB3S9bIaco", description: "The Shawshank Redemption tells the story of Andy Dufresne, a man wrongly imprisoned for murder. Inside prison, he forms a bond with fellow inmate Red. The film explores hope, friendship, and perseverance. Andy’s quiet resilience inspires everyone around him. It is a powerful story of redemption and freedom." }
];

const theatres = [
  { name: "QFX", times: ["10:00 AM", "1:30 PM", "5:00 PM"] },
  { name: "FCube", times: ["11:00 AM", "3:00 PM", "7:00 PM"] },
  { name: "Big Movies", times: ["12:00 PM", "4:30 PM", "8:30 PM"] }
];

export default function MovieDetails() {
  const { id } = useParams();
  const movie = movies.find(m => m.id === id);
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  if (!movie) return <p className="text-yellow-300 p-10">Movie not found</p>;

  return (
    <div className="min-h-screen bg-[#202A44] text-yellow-300 p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2">
        <iframe
          src={movie.trailer}
          title={movie.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-[400px] rounded-xl border border-yellow-500"
        />

        <h1 className="text-4xl font-extrabold text-yellow-400 mt-6">{movie.title}</h1>

        <p className="text-yellow-200 mt-4 leading-relaxed text-lg">{movie.description}</p>
      </div>

      {/* RIGHT SIDE — NOW SHOWING */}
      <div className="bg-[#1B2540] border border-yellow-500 rounded-2xl p-10 h-full min-h-[500px] flex flex-col justify-start">
        <h2 className="text-3xl font-bold text-yellow-300 mb-8 text-center">Now Showing</h2>

        {/* Select Theatre */}
        {!selectedTheatre && (
          <select
            className="w-full text-lg font-semibold max-w-[250px] bg-[#202A44] border border-yellow-400 rounded-xl px-5 py-3 text-yellow-300 mx-auto"
            onChange={(e) => {
              const theatre = theatres.find(t => t.name === e.target.value);
              setSelectedTheatre(theatre);
            }}
          >
            <option value="">Choose Theatre</option>
            {theatres.map((t, i) => (
              <option key={i} value={t.name}>{t.name}</option>
            ))}
          </select>
        )}

        {/* Showtimes */}
        {selectedTheatre && (
          <div className="mt-8 text-center">
            <p className="text-yellow-300 font-semibold text-xl mb-4">{selectedTheatre.name} Showtimes</p>

            <div className="flex flex-wrap justify-center gap-4">
              {selectedTheatre.times.map((time, i) => (
                <span
                  key={i}
                  className="border border-yellow-400 px-5 py-2 rounded-lg text-lg font-medium"
                >
                  {time}
                </span>
              ))}
            </div>

            <button
              className="mt-6 text-lg font-semibold text-yellow-300 underline"
              onClick={() => setSelectedTheatre(null)}
            >
              Change Theatre
            </button>
          </div>
        )}
      </div>

      {/* BUY TICKETS BUTTON OUTSIDE */}
      <div className="lg:col-span-3 mt-8 flex justify-center">
        <button className="bg-yellow-500 hover:bg-yellow-600 px-12 py-4 rounded-2xl font-bold text-[#202A44] text-lg">
          Buy Tickets 🎟
        </button>
      </div>
    </div>
  );
}
