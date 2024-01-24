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
        const { name, value } = body;
        const { storeId } = params;
        
        if(!userId) return NextResponse.json({msg:'Unauthenticated',status:403});
    
        const store = await prisma.store.findMany({
            where : {
               userId
            }
        })
    
        if(!store) return NextResponse.json({msg:'Unauthorised', status:401});
    
        if(!name) return NextResponse.json({ msg:'name required',status:400});

        if(!value) return NextResponse.json({ msg:'value is required',status:400});
    
        const size = await prisma.size.create({
            data : {
                name,
                value,
                storeId
            }
        });
        return NextResponse.json({ size, status:201 });
    
    } catch (error) {
        console.log(`Error in size POST req ${error}`);
        return NextResponse.json({msg:'error in size POST req ',status:500});
    }
}



export async function GET(
    req:Request,
    { params}:{ params : {storeId : string}}
){
    try {

        const { storeId } = params;
        
        if( !storeId ) return NextResponse.json({ msg:'Store id is required',status:400});

        const size = await prisma.size.findMany({
            where:{
                storeId
            }
        });
        return NextResponse.json({ size, status:200 });
    
    } catch (error) {
        console.log(`Error in size GET req ${error}`);
        return NextResponse.json({msg:'error in size GET req ',status:500});
    }
}
