import React from "react";
import SearchBar from "./searchBar";
import LoginDropdown from "../login/loginDropdown";
import UserDropdown from "../login/userDropdown";

export default function Navbar() {
    const $brand = (
        <p className={"font-bold text-3xl text-base-content"}>
            ZenDoc
        </p>
    )

    const $searchBar = (
        <div className={"w-2/3 h-full max-w-4xl"}>
            <SearchBar />
        </div>
    )

    const $login = (
        <LoginDropdown />
    )
    console.log($login)

    const $user = (
        <UserDropdown />
    )

    return (
        <div className={"w-full flex flex-row items-center justify-between px-8 py-4 bg-base-200 border"}>
            <div className={"flex-1 flex flex-row items-center h-12 space-x-4"}>
                {$brand}
                {$searchBar}
            </div>
            {$user}
        </div>
    )
}