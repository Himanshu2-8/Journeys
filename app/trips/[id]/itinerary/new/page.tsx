import NewLocationClient from "@/components/NewLocationCliend";

export default async function NewLocationPage({params}:{params:Promise<{id:string}>}) {
    const {id}=await params;
    return (
        <div>
            <NewLocationClient tripId={id}/>
        </div>
    )
}   