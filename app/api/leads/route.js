export async function GET(request) {

    const leads = [
        {id: 1, name: "Korge Ruiz", submitted: new Date(), status: "Pending", country: "Mexico"},
        {id: 2, name: "Lorge Suiz", submitted: new Date(), status: "Pending", country: "Nexico"},
        {id: 3, name: "Morge Tuiz", submitted: new Date(), status: "Pending", country: "Oexico"},
        {id: 4, name: "Norge Uuiz", submitted: new Date(), status: "Pending", country: "Pexico"},
    ]

    return new Response(JSON.stringify(leads));
}
