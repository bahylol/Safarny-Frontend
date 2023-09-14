import React from 'react'

const Form = () => {
    return (
        <form>
            <div>
                <div class="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                <input class="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg" type="email" placeholder="sameer@email.com" />
            </div>
            <div class="mt-8">
                <div class="flex justify-between items-center">
                    <div class="text-sm font-bold text-gray-700 tracking-wide">
                        Password
                    </div>
                    <div>
                        <a class="text-xs font-display font-semibold text-primary hover:text-primary-focus
                                        cursor-pointer">
                            Forgot Password?
                        </a>
                    </div>
                </div>
                <input class="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg" type="password" placeholder="Password" />
            </div>
            <div class="mt-10">
                <button class="bg-primary text-neutral-content p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primary-focus
                                shadow-lg">
                    Log In
                </button>
            </div>
        </form>
    )
}

export default Form