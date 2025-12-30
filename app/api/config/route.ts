export async function GET() {
    return Response.json({
        frontHost: process.env.Front_Host
    })
}