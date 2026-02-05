import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    setDoc
} from "firebase/firestore";
import { db } from "../config/firebase";

/* ================= MOVIES (20 ITEMS) ================= */
const MOVIES = [
    {
        id: "movie_1",
        title: "Inception",
        genre: ["Sci-Fi"],
        rating: 8.8,
        duration: 148,
        status: "now_showing",
        synopsis: "A thief enters dream worlds.",
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    },
    {
        id: "movie_2",
        title: "The Dark Knight",
        genre: ["Action"],
        rating: 9.0,
        duration: 152,
        status: "now_showing",
        synopsis: "Batman vs Joker.",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
        id: "movie_3",
        title: "Interstellar",
        genre: ["Sci-Fi"],
        rating: 8.6,
        duration: 169,
        status: "now_showing",
        synopsis: "Journey through space and time.",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
        id: "movie_4",
        title: "Avengers Endgame",
        genre: ["Action"],
        rating: 8.4,
        duration: 181,
        status: "now_showing",
        synopsis: "Final Avengers battle.",
        poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
    },
    {
        id: "movie_5",
        title: "Parasite",
        genre: ["Thriller"],
        rating: 8.5,
        duration: 132,
        status: "now_showing",
        synopsis: "Dark class struggle.",
        poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
    },
    {
        id: "movie_6",
        title: "Joker",
        genre: ["Drama"],
        rating: 8.4,
        duration: 122,
        status: "now_showing",
        synopsis: "Rise of Joker.",
        poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
    },
    {
        id: "movie_7",
        title: "Dune",
        genre: ["Sci-Fi"],
        rating: 8.1,
        duration: 155,
        status: "now_showing",
        synopsis: "Desert planet politics.",
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
    },
    {
        id: "movie_8",
        title: "The Matrix",
        genre: ["Sci-Fi"],
        rating: 8.7,
        duration: 136,
        status: "now_showing",
        synopsis: "Reality is a lie.",
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
    },
    {
        id: "movie_9",
        title: "Titanic",
        genre: ["Romance"],
        rating: 7.9,
        duration: 195,
        status: "now_showing",
        synopsis: "Love on doomed ship.",
        poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
    },
    {
        id: "movie_10",
        title: "Oppenheimer",
        genre: ["History"],
        rating: 8.9,
        duration: 180,
        status: "now_showing",
        synopsis: "Father of atomic bomb.",
        poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"
    }
];

// duplicate more to reach 20
for (let i = 11; i <= 20; i++) {
    MOVIES.push({
        ...MOVIES[i - 11],
        id: `movie_${i}`,
        title: `${MOVIES[i - 11].title} ${i}`
    });
}

/* ================= THEATRES ================= */
const THEATRES = [
    { id: "theatre_1", name: "Grand Cinema", location: "Downtown" },
    { id: "theatre_2", name: "City Plex", location: "Mall Road" },
    { id: "theatre_3", name: "IMAX Arena", location: "Tech Park" }
];

/* ================= SHOWTIMES ================= */
const SHOWTIMES = MOVIES.slice(0, 10).map((movie, index) => ({
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

    for (const movie of MOVIES)
        await setDoc(doc(db, "movies", movie.id), movie);

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