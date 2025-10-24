import { ReactNode } from 'react'

type LayoutProps = {
    title?: string
    children?: ReactNode
}

export default function Layout({ title = '', children }) {
    return (
        <div className="bg-main flex h-full flex-row">
            <main
                className="mobile:overflow-x-auto h-full flex-1 justify-center overflow-y-auto lg:overflow-x-clip"
                id="layout-main-section"
            >
                <div className="tablet:px-6 h-full w-full px-4.5 pt-5 pb-10 md:px-8" id="page-container">
                    <div className="">{children}</div>
                </div>
            </main>
        </div>
    )
}
