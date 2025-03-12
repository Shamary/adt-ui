import { NextResponse } from "next/server";
import { cookies } from "next/headers"
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";

// Mock database for storing session data
const otpSessions = new Map<string, { email: string; passwordHash: string }>(); // token -> { email, passwordHash }

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        // Hash the password before storing it
        const passwordHash = await bcrypt.hash(password, 10);

        // Generate a secure session token
        const sessionToken = randomBytes(32).toString("hex");

        // Store email and hashed password in session map
        otpSessions.set(sessionToken, { email, passwordHash: password });

        // Create a response object
        const response = NextResponse.json({ success: true, token: sessionToken });

        // Set the session token as a secure HTTP-only cookie (expires in 5 minutes)
        response.cookies.set("session_token", sessionToken, {
            httpOnly: true,
            maxAge: 300, // 5 minutes
            secure: process.env.NODE_ENV === "production", // Ensure the cookie is only sent over HTTPS in production
            path: "/", // The path where the cookie is accessible
        });

        return response;
    } catch (error) {
        console.error("Error processing OTP request:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        // Retrieve the session token from cookies
        const sessionToken = cookies().get("session_token")?.value;

        if (!sessionToken) {
            return NextResponse.json({ message: "Session token not found" }, { status: 400 });
        }

        // Retrieve session data from the mock database
        const sessionData = otpSessions.get(sessionToken);

        if (!sessionData) {
            return NextResponse.json({ message: "Session not found" }, { status: 404 });
        }

        // Return the email and password hash
        return NextResponse.json({
            email: sessionData.email,
            passwordHash: sessionData.passwordHash,
        });
    } catch (error) {
        console.error("Error fetching session data:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}