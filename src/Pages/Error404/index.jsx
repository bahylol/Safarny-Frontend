import React from 'react';

const Error404 = () => {
    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div class="flex flex-col items-center max-w-sm mx-auto text-center">
                    <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
                    <p class="mt-4 text-gray-500 dark:text-gray-400">The page you are looking for doesn't exist. Here are some helpful links:</p>

                    <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                        <a href="/" class="w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                            Take me home
                        </a>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Error404;
