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
        const { name, price, colorId,sizeId, images,categoryId, isArchived,isFeatured,description } = body;
        const { storeId } = params;
        
        if(!userId) return NextResponse.json({msg:'Unauthenticated',status:401});
    
        const store = await prisma.store.findMany({
            where : {
               userId
            }
        })
    
        if(!store) return NextResponse.json({msg:'Unathorised', status:402});

        if(!storeId) return NextResponse.json({msg:'Store id is required', status:400});
        
        if(!name) return NextResponse.json({ msg:'name required',status:400});

        if(!colorId) return NextResponse.json({ msg:'colorId is required',status:400});

        if(!images || images.length < 0) return NextResponse.json({ msg:'image is required',status:400});

        if(!price) return NextResponse.json({ msg:'price is required',status:400});

        if(!categoryId) return NextResponse.json({ msg:'categoryId is required',status:400});


        if(!description || description.length < 0) return NextResponse.json({ msg:'description is required',status:400});



    
        const product = await prisma.product.create({
            data : {
                name,
                price,
                storeId,
                colorId,
                sizeId,
                categoryId,
                isArchived,
                isFeatured,
                description:{
                    createMany:{
                        data:[...description.map ( (des : string ) => des )]
                    }
                },
                images:{
                    createMany : {
                        data : [ ...images.map( ( img : {url:string}) => img) ]
                    }
                },
            },
            include:{
                
                images:{
                    select:{
                        url:true
                    }
                }
            }

        });
        return NextResponse.json({ product, status:201 });
    
    } catch (error) {
        console.log(`Error in product POST req ${error}`);
        return NextResponse.json({msg:'error in product POST req ',status:500});
    }
}



export async function GET(
    req:Request,
    { params}:{ params : {storeId : string}}
){
    try {

        const { storeId } = params;
        
        if( !storeId ) return NextResponse.json({ msg:'Store id is required',status:400});

        const products = await prisma.product.findMany({
            where:{
                storeId
            },
            include:{
                images:{
                    select: {
                        url:true,
                    }
                },
            }
        });
        return NextResponse.json({ products, status:200 });
    
    } catch (error) {
        console.log(`Error in product GET req ${error}`);
        return NextResponse.json({msg:'error in product GET req ',status:500});
    }
}
