"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Check, X, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

type User = "enes" | "furkan";

type ContentDetails = {
  id: number;
  title: string;
  overview: string;
  type: string;
  release_date: string;
  poster_path: string;
  watched: boolean;
  user: User;
  onWatchedChange?: (id: number, watched: boolean, user: User) => void;
};

export function ContentDialog({
  id,
  title,
  overview,
  type,
  release_date,
  poster_path,
  watched: initialWatched,
  user,
  onWatchedChange,
}: ContentDetails) {
  const [watched, setWatched] = useState(initialWatched);

  useEffect(() => {
    setWatched(initialWatched);
  }, [initialWatched, user]);

  const handleToggleWatched = () => {
    const newWatchedState = !watched;
    setWatched(newWatchedState);
    axios.post("/api/change-watched", {
      id,
      watched: newWatchedState,
      user,
    });

    if (onWatchedChange) {
      onWatchedChange(id, newWatchedState, user);
    }
  };

  const openInTMDB = () => {
    const tmdbType = type === "movie" ? "movie" : "TV";
    window.open(`https://www.themoviedb.org/${tmdbType}/${id}`, "_blank");
  };

  return (
    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          Details for {title}
        </DialogDescription>
      </DialogHeader>

      <div className="flex gap-4">
        <div className="shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={150}
            height={225}
            className="rounded-lg object-cover shadow-md"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">
              Release Date
            </h4>
            <Badge variant="secondary" className="text-xs">
              {new Date(release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Badge>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">
              Type
            </h4>
            <Badge variant="outline" className="text-xs capitalize">
              {type}
            </Badge>
          </div>

          {overview && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1.5">
                Overview
              </h4>
              <p className="text-sm leading-relaxed">{overview}</p>
            </div>
          )}
        </div>
      </div>

      <DialogFooter className="gap-2">
        <Button
          onClick={handleToggleWatched}
          variant={watched ? "outline" : "default"}
          className={`flex-1 ${
            watched ? "" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {watched ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Mark as Unwatched
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Mark as Watched
            </>
          )}
        </Button>

        <Button onClick={openInTMDB} variant="outline" className="flex-1">
          <ExternalLink className="mr-2 h-4 w-4" />
          View on TMDB
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
