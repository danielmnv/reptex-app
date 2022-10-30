import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navbar({ children }) {
    return (
        <div className="ds-drawer">
            <input id="my-drawer-3" type="checkbox" className="ds-drawer-toggle" />
            <div className="ds-drawer-content flex flex-col">
                <div className="w-full ds-navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="ds-btn ds-btn-square ds-btn-ghost">
                            <FontAwesomeIcon icon={faBars} size="xl" />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <img className="h-16 w-auto" src="/img/logo.png" />
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="ds-menu ds-menu-horizontal">
                            <li><a>Navbar Item 1</a></li>
                            <li><a>Navbar Item 2</a></li>
                        </ul>
                    </div>
                </div>
                { /* Main content */}
                {children}
            </div>

            <div className="ds-drawer-side">
                <label htmlFor="my-drawer-3" className="ds-drawer-overlay"></label>
                <ul className="ds-menu p-4 overflow-y-auto w-80 bg-base-100">
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    )
}