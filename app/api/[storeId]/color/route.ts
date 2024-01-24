import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    { params}:{ params : {storeId : string}}
){
    try {
        const { userId } = auth();
        const body = await req.json();
        const { value } = body;
        const { storeId } = params;
        
        if(!userId) return NextResponse.json({msg:'Unauthenticated',status:403});
    
        const store = await prisma.store.findMany({
            where : {
               userId
            }
        })
    
        if(!store) return NextResponse.json({msg:'Unauthorised', status:401});
    
        if(!value) return NextResponse.json({ msg:'value is required',status:400});
    
        const color = await prisma.color.create({
            data : {
                value,
                storeId
            }
        });
        return NextResponse.json({ color, status:201 });
    
    } catch (error) {
        console.log(`Error in color POST req ${error}`);
        return NextResponse.json({msg:'error in color POST req ',status:500});
    }
}



export async function GET(
    req:Request,
    { params}:{ params : {storeId : string}}
){
    try {

        const { storeId } = params;
        
        if( !storeId ) return NextResponse.json({ msg:'Store id is required',status:400});

        const color = await prisma.color.findMany({
            where:{
                storeId
            }
        });
        return NextResponse.json({ color, status:200 });
    
    } catch (error) {
        console.log(`Error in color GET req ${error}`);
        return NextResponse.json({msg:'error in color GET req ',status:500});
    }
}
