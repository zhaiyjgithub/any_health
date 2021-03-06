import React from "react";

export default function NavBar() {
    const $brand = (
        <p className={"font-bold text-3xl text-base-content"}>
            Zendoc
        </p>
    )

    const $signInOrRegisterButton = (
        <button type={"button"} className={"text-sm text-base-600 font-medium border-primary-focus border-b border-dotted hover:border-solid"}>Sign in / Register</button>
    )

    const $listPracticeButton = (
        <button type={"button"} className={"text-sm text-base-600 font-medium border-primary-focus border-b border-dotted hover:border-solid"}>List your practice on Zocdoc</button>
    )

    const $divider = (
        <div className={"h-5 w-px bg-primary-focus"}/>
    )
    const $navButtons = (
        <div className={"flex flex-row items-center space-x-4"}>
            {$listPracticeButton}
            {$divider}
            {$signInOrRegisterButton}
        </div>
    )

    return (
        <div className={"w-full bg-primary flex flex-row items-center justify-center"}>
            <div className={"container"}>
                <div className={"flex flex-row items-center justify-between px-8 py-4 "}>
                    <div className={"flex-1 flex flex-row items-center h-12 space-x-4"}>
                        {$brand}
                    </div>
                    {$navButtons}
                </div>
            </div>
        </div>
    )
}
