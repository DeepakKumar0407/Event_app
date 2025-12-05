import Event from "@/database/event.model"
import ConnectDb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req:NextRequest){
    try{
        await ConnectDb();
        const formData = await req.formData();
        let event;
        try{
            event = Object.fromEntries(formData.entries())
        }catch(e){
            return NextResponse.json({message: 'Invalid json data format'},{status:400})
        }
        const file = formData.get('image') as File
        if(!file){
            NextResponse.json({message:"Provide Image File"},{status:400})
        }
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'DevEvent'},(error,result)=>{
                if(error) return reject(error);
                resolve(result);
            }).end(buffer)
        })
        event.image = (uploadResult as {secure_url:string}).secure_url
        const createdEvent = await Event.create(event);
        return NextResponse.json({message:"Event Created", event: createdEvent},{status:201})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({message: 'Event creation failed',error:e instanceof Error? e.message: "Unknown"},{status:400})
    }
}

export async function GET(){
    try{
        await ConnectDb()
        const events = await Event.find().sort({createdAt:-1})
        return NextResponse.json({message:"Fetched Events",events},{status:200})
    }catch(e){
        NextResponse.json({message:"Event fetching failed",error:e},{status:400})
    }
}
