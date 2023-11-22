export default function JoinForm({ where } : { where : "end" | "top" }) {

    const fromClass = where == "top" 
        ? 
    "grid grid-flow-row md:grid-flow-col gap-2 mt-2 md:mt-8 w-11/12 text-black"
        :
    "grid grid-flow-row md:grid-flow-col gap-2 mt-2 md:mt-8 w-2/3 md:w-1/2 text-black"

    const buttonClass = where == "top"
        ?
    "h-14 md:h-16 rounded-full text-lg px-6 bg-[#000] text-white tracking-tight font-semibold"
        :
    "h-14 md:h-16 rounded-full text-lg px-6 bg-[#000] text-white tracking-tight font-semibold"

    return (
        <form action={`http://localhost:3000/auth/signin?callbackUrl=%2Fdashboard`} 
            className={fromClass}>
            <input name="username" className="h-14 md:h-16 rounded-lg text-md pl-4 placeholder:text-stone-700
			font-semibold tracking-tight" type="text" placeholder="clickk.link/your_name" />
            <button type="submit" className={buttonClass}>Get your Clickk.link</button>
        </form>
    )
}