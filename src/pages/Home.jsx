import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const movies = [
    { id: "1", title: "Inception", poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", duration: "148 mins", release_date: "2010-07-16", vote_average: 8.8, overview: "A mind-bending thriller where a thief enters people's dreams to steal secrets." },
    { id: "2", title: "Oppenheimer", poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", duration: "180 mins", release_date: "2023-07-21", vote_average: 8.5, overview: "The story of J. Robert Oppenheimer and the creation of the atomic bomb." },
    { id: "3", title: "The Dark Knight", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", duration: "152 mins", release_date: "2008-07-18", vote_average: 9.0, overview: "Batman faces his greatest enemy, the Joker, in this iconic superhero thriller." },
    { id: "4", title: "Interstellar", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", duration: "169 mins", release_date: "2014-11-07", vote_average: 8.6, overview: "Astronauts travel through a wormhole to find a new home for humanity." },
    { id: "5", title: "Avengers Endgame", poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg", duration: "181 mins", release_date: "2019-04-26", vote_average: 8.4, overview: "The Avengers unite to undo the devastation caused by Thanos in this epic finale." },
    { id: "6", title: "Parasite", poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", duration: "132 mins", release_date: "2019-05-30", vote_average: 8.6, overview: "A poor family slowly infiltrates a wealthy household, revealing social inequality." },
    { id: "7", title: "Joker", poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", duration: "122 mins", release_date: "2019-10-04", vote_average: 8.5, overview: "Arthur Fleck descends into madness to become the infamous Joker." },
    { id: "8", title: "Gladiator", poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", duration: "155 mins", release_date: "2000-05-05", vote_average: 8.5, overview: "Maximus seeks revenge after being betrayed and forced into slavery as a gladiator." },
    { id: "9", title: "The Shawshank Redemption", poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", duration: "142 mins", release_date: "1994-09-23", vote_average: 9.3, overview: "Wrongly imprisoned Andy Dufresne inspires hope and friendship inside Shawshank prison." },
    { id: "10", title: "Titanic", poster: "https://image.tmdb.org/t/p/w500/kHXEpyfl6zqn8a6YuozZUujufXf.jpg", duration: "195 mins", release_date: "1997-12-19", vote_average: 7.8, overview: "A young couple fall in love aboard the doomed Titanic ship." },
    { id: "11", title: "Avatar", poster: "https://image.tmdb.org/t/p/w500/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg", duration: "162 mins", release_date: "2009-12-18", vote_average: 7.8, overview: "A marine on an alien planet discovers a new way of life." },
    { id: "12", title: "The Lion King", poster: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg", duration: "88 mins", release_date: "1994-06-15", vote_average: 8.5, overview: "Simba learns to become king of the Pride Lands." },
    { id: "13", title: "Frozen II", poster: "https://image.tmdb.org/t/p/w500/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg", duration: "103 mins", release_date: "2019-11-22", vote_average: 6.8, overview: "Elsa and Anna go on a journey to discover the origin of Elsa's powers." },
    { id: "14", title: "Spider-Man: No Way Home", poster: "https://image.tmdb.org/t/p/w500/u0lVTc4C7e3UO8OWz9v4WfHnJHP.jpg", duration: "148 mins", release_date: "2021-12-17", vote_average: 8.7, overview: "Peter Parker faces multiverse villains to save the day." },
    { id: "15", title: "Black Panther", poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg", duration: "134 mins", release_date: "2018-02-16", vote_average: 7.3, overview: "T'Challa defends Wakanda from threats and takes the throne." },
    { id: "16", title: "Harry Potter and the Sorcerer's Stone", poster: "https://image.tmdb.org/t/p/w500/6J5xVYk5MRi5QF3UeJKn7sZuhX1.jpg", duration: "152 mins", release_date: "2001-11-16", vote_average: 7.6, overview: "Harry discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry." }
];

export default function Home() {
    const [heroIndex, setHeroIndex] = useState(0);

    // auto carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const heroMovies = movies.slice(0, 3);
    const heroMovie = heroMovies[heroIndex];

    const nextSlide = () => setHeroIndex((heroIndex + 1) % heroMovies.length);
    const prevSlide = () => setHeroIndex((heroIndex - 1 + heroMovies.length) % heroMovies.length);

    return (
        <div className="bg-[#202A44] text-yellow-300 min-h-screen">
            {/* HERO CAROUSEL */}
            {heroMovie && (
                <div className="relative h-[75vh]">
                    <img
                        src={heroMovie.poster}
                        alt={heroMovie.title}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#202A44] to-transparent" />

                    <div className="relative h-full flex items-center max-w-[85%] mx-auto px-6">
                        <div>
                            <h1 className="text-5xl font-bold mb-3">{heroMovie.title}</h1>
                            <p className="text-sm mb-2">
                                {heroMovie.release_date} • {heroMovie.duration}
                            </p>
                            <div className="flex items-center gap-2 mb-3 text-yellow-400">
                                <Star size={20} fill="currentColor" />
                                <span className="text-yellow-300 font-semibold">{heroMovie.vote_average.toFixed(1)}</span>
                            </div>
                            <p className="mb-6">{heroMovie.overview.slice(0, 100)}...</p>
                            <div className="flex gap-4">
                                <button className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-semibold text-[#202A44]">
                                    Buy Tickets
                                </button>
                                <button className="border border-yellow-400 px-6 py-3 rounded-lg hover:bg-yellow-900/50">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ARROWS */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full cursor-pointer"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full cursor-pointer"
                    >
                        <ChevronRight size={28} />
                    </button>

                    {/* DOTS */}
                    <div className="absolute bottom-6 w-full flex justify-center gap-3">
                        {heroMovies.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setHeroIndex(i)}
                                className={`w-3 h-3 rounded-full transition cursor-pointer ${i === heroIndex ? "bg-yellow-500" : "bg-yellow-300/50"}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* POPULAR MOVIES */}
            <div className="px-10 py-14">
                <h2 className="text-3xl font-bold mb-6">Popular Movies</h2>
                <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                    {movies.map((movie) => (
                        <div key={movie.id} className="min-w-[200px] bg-[#1B2540] rounded-xl overflow-hidden">
                            <img src={movie.poster} alt={movie.title} className="h-[300px] w-full object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-yellow-300">{movie.title}</h3>
                                <p className="text-sm text-yellow-200">{movie.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
