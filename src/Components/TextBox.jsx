import React from 'react'


const TextBox = (props) => {
    return (
        <form>
            <div class="flex">
                <div class="relative w-full">
                    <input type="search" id="search-dropdown" class="text-center block p-2.5 w-full z-20 input input-bordered input-primary" placeholder={props.placeholder} required />
                    <button type="submit" class=" absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-neutral bg-accent rounded-r-lg border border-accent-focus hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary ">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default TextBox