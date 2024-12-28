import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/sanity/lib/drizzle"; // Update the import paths as needed

import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";

// GET: Fetch all cart items
export async function GET(request: NextRequest) {
    try {
        const res = await db.select().from(cartTable);
        return NextResponse.json(res);
    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.json(
            { message: "Something went wrong while fetching data", error },
            { status: 500 }
        );
    }
}

// POST: Add a new cart item
export const POST = async (request: NextRequest) => {
    const req = await request.json();

    const uid = uuid();
    const setCookies = await cookies();

    if(!(await cookies()).has("user_id")) {    
        setCookies.set("user_id", uid)
    }

    try {
      const res = await db.insert(cartTable).values({
        userId: req.userId,
        productId: req.productId,
        quantity: req.quantity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
        return NextResponse.json(res);
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json(
            { message: "Something went wrong while adding data", error },
            { status: 500 }
        );
    }
};      

        