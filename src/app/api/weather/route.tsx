import { WEATHER_API_URL } from "@/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const res = await axios.get(`${WEATHER_API_URL}?q=${city}&units=metric&appid=${process.env.WEATHER_MAP_API_KEY}`);

    return NextResponse.json(res.data)

}