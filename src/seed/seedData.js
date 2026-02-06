import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    setDoc
} from "firebase/firestore";
import { db } from "../config/Firebase";

/* ================= MOVIES (20 UNIQUE ITEMS) ================= */
export const MOVIES = [
    {
        id: "movie_1",
        title: "Inception",
        genre: ["Sci-Fi"],
        rating: 8.8,
        duration: 148,
        status: "now_showing",
        synopsis:
            "Dom Cobb is a skilled thief who specializes in stealing valuable secrets from deep within the subconscious during dreams. Offered a chance to have his criminal past erased, Cobb must attempt the impossible task of inception: planting an idea into someone’s mind. As the mission unfolds across multiple dream layers, the line between reality and illusion begins to blur.",
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
        id: "movie_2",
        title: "The Dark Knight",
        genre: ["Action"],
        rating: 9.0,
        duration: 152,
        status: "now_showing",
        synopsis:
            "Batman faces his greatest psychological and moral challenge when the Joker emerges as a chaotic criminal mastermind in Gotham City. As the Joker pushes the city into anarchy, Batman must confront the limits of justice, heroism, and sacrifice while trying to protect the people he swore to serve.",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
        id: "movie_3",
        title: "Interstellar",
        genre: ["Sci-Fi"],
        rating: 8.6,
        duration: 169,
        status: "now_showing",
        synopsis:
            "With Earth becoming increasingly uninhabitable, a team of astronauts travels through a mysterious wormhole near Saturn in search of a new home for humanity. As time and space behave unpredictably, personal sacrifices collide with the survival of the human race.",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
        id: "movie_4",
        title: "Avengers Endgame",
        genre: ["Action"],
        rating: 8.4,
        duration: 181,
        status: "now_showing",
        synopsis:
            "After the devastating events caused by Thanos, the remaining Avengers regroup for one final mission. They must travel through time, confront their past decisions, and risk everything to restore balance to the universe and bring back what was lost.",
        poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
        trailer: "https://www.youtube.com/embed/TcMBFSGVi1c"
    },
    {
        id: "movie_5",
        title: "Parasite",
        genre: ["Thriller"],
        rating: 8.5,
        duration: 132,
        status: "now_showing",
        synopsis:
            "A struggling family gradually inserts themselves into the lives of a wealthy household by posing as unrelated professionals. As class boundaries blur, hidden tensions and dark secrets surface, leading to consequences that neither family could have predicted.",
        poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        trailer: "https://www.youtube.com/embed/5xH0HfJHsaY"
    },
    {
        id: "movie_6",
        title: "Joker",
        genre: ["Drama"],
        rating: 8.4,
        duration: 122,
        status: "now_showing",
        synopsis:
            "Arthur Fleck, a struggling comedian living in Gotham City, slowly descends into madness as society repeatedly pushes him aside. Isolated and misunderstood, his transformation into the Joker becomes a chilling exploration of mental health, neglect, and identity.",
        poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        trailer: "https://www.youtube.com/embed/zAGVQLHvwOY"
    },
    {
        id: "movie_7",
        title: "Dune",
        genre: ["Sci-Fi"],
        rating: 8.1,
        duration: 155,
        status: "now_showing",
        synopsis:
            "Paul Atreides travels with his noble family to the desert planet Arrakis, the only source of a powerful and valuable resource. As political betrayal unfolds, Paul must embrace his destiny while navigating survival, power, and ancient prophecies.",
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        trailer: "https://www.youtube.com/embed/n9xhJrPXop4"
    },
    {
        id: "movie_8",
        title: "Titanic",
        genre: ["Romance"],
        rating: 7.9,
        duration: 195,
        status: "now_showing",
        synopsis:
            "A young artist and an upper-class passenger form an unexpected bond aboard the luxurious RMS Titanic. As the ship embarks on its maiden voyage, their relationship is tested by social boundaries and an impending historical disaster.",
        poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        trailer: "https://www.youtube.com/embed/kVrqfYjkTdQ"
    },
    {
        id: "movie_9",
        title: "Oppenheimer",
        genre: ["History"],
        rating: 8.9,
        duration: 180,
        status: "now_showing",
        synopsis:
            "This film chronicles the life of J. Robert Oppenheimer, the physicist who played a key role in developing the atomic bomb. As scientific ambition collides with moral responsibility, the story explores the lasting consequences of world-changing decisions.",
        poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
        trailer: "https://www.youtube.com/embed/uYPbbksJxIg"
    },
    {
        id: "movie_10",
        title: "The Batman",
        genre: ["Action"],
        rating: 8.3,
        duration: 156,
        status: "now_showing",
        synopsis:
            "In his early years as Gotham’s vigilante, Batman uncovers a web of corruption tied to the city’s elite. While pursuing a serial killer known as the Riddler, he is forced to confront uncomfortable truths about his family and the city he protects.",
        poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        trailer: "https://www.youtube.com/embed/mqqft2x_Aa4"
    },
    {
        id: "movie_11",
        title: "Doctor Strange",
        genre: ["Action"],
        rating: 7.5,
        duration: 115,
        status: "now_showing",
        synopsis:
            "After a career-ending accident, a brilliant neurosurgeon searches for healing and instead discovers a hidden world of mysticism. Trained in the mystical arts, Doctor Strange must protect reality from powerful threats beyond human understanding.",
        poster: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
        trailer: "https://www.youtube.com/embed/HSzx-zryEgM"
    },
    {
        id: "movie_12",
        title: "Spider-Man: No Way Home",
        genre: ["Action"],
        rating: 8.7,
        duration: 148,
        status: "now_showing",
        synopsis:
            "When Spider-Man’s identity is revealed to the world, Peter Parker seeks help from Doctor Strange to fix his life. The spell goes wrong, opening the multiverse and forcing Peter to face enemies from alternate realities while redefining what it means to be a hero.",
        poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        trailer: "https://www.youtube.com/embed/JfVOs4VSpmA"
    }
];




/* ================= THEATRES ================= */
export const THEATRES = [
    { id: "theatre_1", name: "Grand Cinema", location: "Downtown" },
    { id: "theatre_2", name: "City Plex", location: "Mall Road" },
    { id: "theatre_3", name: "IMAX Arena", location: "Tech Park" }
];

/* ================= SHOWTIMES ================= */
export const SHOWTIMES = MOVIES.slice(0, 10).map((movie, index) => ({
    id: `show_${index + 1}`,
    movieId: movie.id,
    theatreId: THEATRES[index % 3].id,
    time: `${10 + index * 2}:00`
}));

/* ================= SEATS ================= */
function generateSeats(show) {
    const seats = [];
    const rows = "ABCDEFGHIJ".split("");
    rows.forEach(row => {
        for (let i = 1; i <= 10; i++) {
            seats.push({
                id: `${show.id}_${row}${i}`,
                showTimeId: show.id,
                seatID: `${row}${i}`,
                status: "available",
                type: row <= "B" ? "VIP" : "Regular"
            });
        }
    });
    return seats;
}

/* ================= SEED FUNCTION ================= */
export async function seedFirestore() {
    console.log("🔥 Clearing old data...");

    const collections = ["movies", "theatres", "showtimes", "seats"];

    for (const col of collections) {
        const snap = await getDocs(collection(db, col));
        for (const d of snap.docs) {
            await deleteDoc(doc(db, col, d.id));
        }
    }

    console.log("✅ Old data removed");

    for (const movie of MOVIES) await setDoc(doc(db, "movies", movie.id), movie);

    for (const theatre of THEATRES)
        await setDoc(doc(db, "theatres", theatre.id), theatre);

    for (const show of SHOWTIMES) {
        await setDoc(doc(db, "showtimes", show.id), show);
        const seats = generateSeats(show);
        for (const seat of seats) {
            await setDoc(doc(db, "seats", seat.id), seat);
        }
    }

    console.log("🎉 Seeding completed successfully");
}
