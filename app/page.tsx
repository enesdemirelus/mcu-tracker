"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

type Content = {
  id: number;
  title: string;
  overview: string;
  type: string;
  release_date: string;
  poster_path: string;
  watched: boolean;
};

export default function Home() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChangeWatched = (id: number, watched: boolean) => {
    axios
      .post("/api/change-watched", { id, watched })
      .then((response) => {
        console.log("Watched status changed", response.data);
        setContent(
          content.map((item) => (item.id === id ? { ...item, watched } : item))
        );
      })
      .catch((error) => {
        console.error("Failed to change watched status", error);
      });
  };

  useEffect(() => {
    axios
      .get("/api/get-content")
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        console.error("Failed to load content", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 p-6">
        {content.map((content) => (
          <li key={content.id} className="list-none">
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative cursor-pointer">
              <Image
                onClick={() =>
                  handleChangeWatched(content.id, !content.watched)
                }
                src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                alt={content.title}
                width={500}
                height={500}
                className={`transition-opacity ${
                  content.watched ? "opacity-40" : "opacity-100"
                }`}
              ></Image>
              {content.watched && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-green-500 rounded-full p-6 shadow-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 w-20 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
