import UserStats from "@/components/dashboard/UserStats"
import UserForm from "@/components/dashboard/UserForm"
import Themes from "@/components/dashboard/Themes"

export default async function DashBoardPage() {
    return (
        <div className="h-fit mt-12 xl:mt-32" >
            <UserForm />
            <UserStats />
            <Themes />
        </div>
    )
}

/*
<section className="mt-12 w-full flex items-center gap-2 justify-center">
                    <input id="bg" type="color" className="style1 w-14 h-14 xl:h-20 rounded-lg"
                        value={theme.backgroundColor}
                        onChange={(e) => {
                            setTheme({
                                ...theme,
                                backgroundColor: e.target.value
                            })
                        }}
                    />
                    <p className="text-center text-sm xl:text-lg font-semibold">Background color</p>
                    <input id="col" type="color" className="style1 w-14 h-14 xl:h-20 rounded-lg"
                        value={theme.color}
                        onChange={(e) => {
                            setTheme({
                                ...theme,
                                color: e.target.value
                            })
                        }}
                    />
                    <p className="text-center text-sm xl:text-lg font-semibold">Accent color</p>
                </section>
*/