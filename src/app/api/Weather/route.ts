import axios from "axios"
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=15.377607196417046&lon=137.45480202093694&appid=${process.env.WEATHER_MAP_API_KEY}`);

  return NextResponse.json(res.data);


}
