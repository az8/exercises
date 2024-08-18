export async function GET(request) {

    const leads = [
        {id: 1, name: "Jorge Ruiz", submitted: new Date(), status: "Pending", country: "Mexico"},
        {id: 2, name: "Korge Suiz", submitted: new Date(), status: "Pending", country: "Nexico"},
        {id: 3, name: "Lorge Tuiz", submitted: new Date(), status: "Pending", country: "Oexico"},
        {id: 4, name: "Morge Uuiz", submitted: new Date(), status: "Pending", country: "Pexico"},
        {id: 5, name: "Norge Vuiz", submitted: new Date(), status: "Pending", country: "Qexico"},
    ]

    return new Response(JSON.stringify(leads));
}
