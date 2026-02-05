import { useParams } from "react-router-dom"
import { useState } from "react"

const movies = [
  {
    id: "1",
    title: "Inception",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    description:
      "Inception is a mind-bending science fiction thriller directed by Christopher Nolan. The story follows Dom Cobb, a skilled thief who specializes in extracting secrets from deep within the subconscious during dreams. Cobb is offered a chance to erase his criminal past by performing an impossible task called inception. As layers of dreams stack upon one another, reality begins to blur. The film explores time, memory, guilt, and the power of ideas. With stunning visuals and a gripping score, Inception challenges the audience to question what is real."
  },
  {
    id: "2",
    title: "Oppenheimer",
    trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
    description:
      "Oppenheimer is a historical drama that tells the story of J. Robert Oppenheimer, the brilliant physicist behind the creation of the atomic bomb. The film explores his role in the Manhattan Project and the moral consequences of his invention. As the world changes forever, Oppenheimer struggles with guilt, power, and responsibility. The narrative moves between science, politics, and personal conflict. It is a deep and emotional portrayal of ambition and its cost."
  },
  {
    id: "3",
    title: "The Dark Knight",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    description:
      "The Dark Knight follows Batman as he faces his greatest enemy, the Joker. Gotham City descends into chaos as the Joker challenges Batman’s sense of justice and morality. The film explores themes of order versus chaos and heroism versus corruption. Heath Ledger delivers a legendary performance as the Joker. With intense action sequences and emotional depth, this movie redefined the superhero genre."
  }
]

const theatres = [
  { name: "QFX", times: ["10:00 AM", "1:30 PM", "5:00 PM"] },
  { name: "FCube", times: ["11:00 AM", "3:00 PM", "7:00 PM"] },
  { name: "Big Movies", times: ["12:00 PM", "4:30 PM", "8:30 PM"] }
]

export default function MovieDetails() {
  const { id } = useParams()
  const movie = movies.find(m => m.id === id)
  const [selectedTheatre, setSelectedTheatre] = useState(null)

  if (!movie) return <p className="text-yellow-400 p-10">Movie not found</p>

  return (
    <div className="min-h-screen bg-[#0b1f3f] text-yellow-400 p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2">
        <iframe
          src={movie.trailer}
          title={movie.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-[360px] rounded-xl border border-yellow-500"
        />

        <h1 className="text-3xl font-bold text-yellow-400 mt-6">
          {movie.title}
        </h1>

        <p className="text-yellow-300 mt-4 leading-relaxed">
          {movie.description}
        </p>
      </div>

      {/* RIGHT SIDE — NOW SHOWING BOX */}
      <div className="bg-[#10294b] border border-yellow-500 rounded-2xl p-8 h-fit min-h-[350px] flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-yellow-300 mb-6">
            Now Showing
          </h2>

          {/* THEATRE SELECT */}
          {!selectedTheatre && (
            <select
              className="w-full max-w-[220px] bg-[#0b1f3f] border border-yellow-400 rounded-lg px-4 py-2 text-yellow-400"
              onChange={(e) => {
                const theatre = theatres.find(t => t.name === e.target.value)
                setSelectedTheatre(theatre)
              }}
            >
              <option value="">Select Theatre</option>
              {theatres.map((t, index) => (
                <option key={index} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          )}

          {/* SHOWTIMES */}
          {selectedTheatre && (
            <div className="mt-6">
              <p className="text-yellow-400 font-semibold mb-3">
                {selectedTheatre.name} Showtimes
              </p>

              <div className="flex flex-wrap gap-3">
                {selectedTheatre.times.map((time, i) => (
                  <span
                    key={i}
                    className="border border-yellow-400 px-4 py-1 rounded-lg text-sm"
                  >
                    {time}
                  </span>
                ))}
              </div>

              <button
                className="mt-5 text-sm text-yellow-300 underline"
                onClick={() => setSelectedTheatre(null)}
              >
                Change Theatre
              </button>
            </div>
          )}
        </div>

        {/* BOOK NOW BUTTON */}
        <button className="mt-6 w-full bg-yellow-400 text-[#0b1f3f] hover:bg-yellow-300 py-3 rounded-xl font-semibold">
          Book Tickets 🎟
        </button>
      </div>
    </div>
  )
}
