"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ContentDialog } from "./components/ContentDialog";
import { Badge } from "@/components/ui/badge";

type Content = {
  id: number;
  title: string;
  overview: string;
  type: string;
  release_date: string;
  poster_path: string;
  enes_watched: boolean;
  furkan_watched: boolean;
};

type User = "enes" | "furkan";

export default function Home() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User>("enes");

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

  const handleWatchedChange = (id: number, watched: boolean, user: User) => {
    setContent((prevContent) => {
      const updatedContent = prevContent.map((item) =>
        item.id === id
          ? {
              ...item,
              [`${user}_watched`]: watched,
            }
          : item
      );
      return updatedContent;
    });
  };

  const getWatchedStatus = (content: Content): boolean => {
    return selectedUser === "enes"
      ? content.enes_watched
      : content.furkan_watched;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <Badge
            variant={selectedUser === "enes" ? "default" : "outline"}
            className="cursor-pointer px-2 py-1 text-xs rounded-md"
            onClick={() => setSelectedUser("enes")}
          >
            Enes
          </Badge>
          <Badge
            variant={selectedUser === "furkan" ? "default" : "outline"}
            className="cursor-pointer px-2 py-1 text-xs rounded-md"
            onClick={() => setSelectedUser("furkan")}
          >
            Furkan
          </Badge>
        </div>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {content.map((contentItem) => {
          const watched = getWatchedStatus(contentItem);
          return (
            <li key={contentItem.id} className="list-none">
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative">
                <Dialog>
                  <DialogTrigger className="block w-full">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${contentItem.poster_path}`}
                      alt={contentItem.title}
                      width={500}
                      height={500}
                      className={`w-full h-auto block transition-opacity ${
                        watched ? "opacity-40" : "opacity-100"
                      }`}
                    />
                    {watched && (
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
                    <ContentDialog
                      id={contentItem.id}
                      title={contentItem.title}
                      overview={contentItem.overview}
                      type={contentItem.type}
                      release_date={contentItem.release_date}
                      poster_path={contentItem.poster_path}
                      watched={watched}
                      user={selectedUser}
                      onWatchedChange={handleWatchedChange}
                    ></ContentDialog>
                  </DialogTrigger>
                </Dialog>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
