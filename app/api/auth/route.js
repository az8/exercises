// mock non production api
export async function GET(request) {

    const auth = {username: "admin", password: "admin"}

    return new Response(JSON.stringify(auth));
}
