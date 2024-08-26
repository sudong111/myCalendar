export default function SideMenu() {
    return (
        <aside id="sidebar-multi-level-sidebar"
               className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
               aria-label="Sidebar" aria-hidden="true">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-center pb-2">
                    <h5 className="text-gray-500 uppercase dark:text-gray-400">Menu</h5>
                    <button type="button" className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <span>X</span>
                    </button>
                </div>
                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="#"
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">Test #1</span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">Test #2</span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">Test #3</span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">Test #4</span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">Test #5</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

    )
}