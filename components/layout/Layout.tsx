import { ReactNode } from 'react'

type LayoutProps = {
    title?: string
    children?: ReactNode
}

export default function Layout({ title, children }) {
    return (
        <>
            <div className="bg-main flex h-full min-w-[1200px] flex-row">
                <main
                    className="mobile:overflow-x-auto h-full flex-1 justify-center overflow-y-auto lg:overflow-x-clip"
                    id="layout-main-section"
                >
                    <div className="tablet:px-6 h-full w-full px-8 pt-5 pb-10" id="page-container">
                        <div className="">{children}</div>
                    </div>
                </main>
            </div>
        </>
    )
}
