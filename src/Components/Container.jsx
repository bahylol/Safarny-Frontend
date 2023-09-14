import React from 'react'


const Container = (props) => {
    return (
        <div>
            <div class="lg:flex">
                <div class="lg:w-1/2 xl:max-w-screen-sm">
                    <div class="py-12 bg-base-100 lg:bg-base-100 flex justify-center lg:justify-start lg:px-12">
                        <div class="cursor-pointer flex items-center">
                        </div>
                    </div>
                    <div class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                        <div class="mt-12">
                            {props.Content}
                            <div class="mt-12 text-sm font-display font-semibold text-neutral-content text-center">
                                Don't have an account ? <a class="cursor-pointer text-primary hover:text-primary-focus">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hidden shadow-2xl lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen overflow-hidden">
                    <img className='rounded-2xl h-fit' src={props.Image} alt="logo" />
                </div>
            </div>
        </div>
    )
}

export default Container