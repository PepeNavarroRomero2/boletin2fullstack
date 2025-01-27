import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjcwjhszfnocrkvwumnh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3dqaHN6Zm5vY3Jrdnd1bW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODgxNTksImV4cCI6MjA1Mjk2NDE1OX0.Ob2eeJk5wlO8tUjmkvx9N6aB1cIPcsuKiJoMa2Jwuk8"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){

    const{data: contacts, error} = await supabase
    .from('productos')
    .select('*')
    
    return new Response(JSON.stringify(contacts), {status:200})
}

export async function POST(request){
    const body = await request.json()
    const contacto = body.contact
    const {data: postData, error} = await supabase.from("productos").insert(contacto)

    if(!error){
        return new Response(JSON.stringify({success: "Creado con éxito"}), {status:201})
    }

    return new Response(JSON.stringify(error) , {status:400})
    
}

export async function PUT(request){
    const body = await request.json()
    const id = body.id
    const {data: updateData, error} = await supabase.from("productos").update(body.update).eq("id",id)
    return new Response(JSON.stringify({success: "actualizado"},{status:200}))
    }