import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id, watched } = await request.json();
  const filePath = path.join(process.cwd(), "backend/mcu_tmdb.json");
  const movies = JSON.parse(await fs.readFile(filePath, "utf-8"));
  
  const movie = movies.find((m: any) => m.id === id);
  movie.watched = watched;
  
  await fs.writeFile(filePath, JSON.stringify(movies, null, 2));
  return NextResponse.json({ success: true });
}

