export default function Page() {
    return (
        <>
        <h1 className="text-center text-shadow-white text-4xl font-bold mt-20">
            [Open Beta] RepoLens Extension
        </h1>
        <div className="text-center mt-4 text-lg text-white-500 ml-40 mr-40 italic  ">
            Explore your GitHub repositories like never before with RepoLens - now available as a browser extension! Dive into detailed insights, visualize your project's history, and discover key contributors right from your browser. Experience the power of RepoLens on every repository you visit. Try it out today and unlock the full potential of your GitHub experience!
        </div>
        <div className="flex justify-center mt-8">
            <a
                href="https://github.com/Anshul2308z/repolens-extension"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
                Install the Extension!
            </a>
        </div>
        <div
        className="m-40 mt-10 text-center text-lg text-white-500 "
        >
            <h2 className="text-2xl font-bold mb-4">How to Use RepoLens Extension:</h2>
            <ol className="list-decimal list-inside text-left max-w-3xl mx-auto">
                <li className="mb-2">
                    Install the RepoLens Extension from the link above.
                </li>
                <li className="mb-2">
                    Turn on developer mode in your browser's extensions settings and load the unpacked extension from the downloaded folder.
                </li>
                <li className="mb-2">
                    Once installed, navigate to any GitHub repository page.
                </li>
                <li className="mb-2">
                    Click on the RepoLens icon in your browser toolbar to open the extension.
                </li>
                <li className="mb-2">
                    Explore detailed insights about the repository, including commit history, contributor stats, and more!
                </li>
            </ol>
        </div>
        </>
        
        
    )
}
    