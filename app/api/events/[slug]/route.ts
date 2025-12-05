import Event from "@/database/event.model"
import ConnectDb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    try{
        await ConnectDb()
        const {slug} = await params
        const events = await Event.findOne({slug:slug})
        return NextResponse.json({message:"Fetched Events",events},{status:200})
    }catch(e){
        NextResponse.json({message:"Event fetching failed",error:e},{status:400})
    }
}