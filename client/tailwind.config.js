/** @type {import { 'tailwindcss' }.Config} */


export default {
    content : [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend : {
            colors : {
                "primary100" : "#ffbg00",
                "primary-200" : "#ffc929",
                "secondary-100" : "#00b050",
                "secondary-200" : "#00b050"
            }
        },
    },
    plugins : [],
}