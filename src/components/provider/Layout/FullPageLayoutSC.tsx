import { FooterSC } from "@components/FooterSC"
import { NavbarSC } from "@components/NavbarSC"
import { getPages } from "./layout.utils"

type FullPageLayoutProps = { children: React.ReactNode }

export const FullPageLayout = async ({ children }: FullPageLayoutProps) => {
  const pages = await getPages()

  return (
    <div className="w-full h-screen grid grid-rows-[auto,1fr]">
      <NavbarSC pages={pages} />

      <div>
        {children}
        <FooterSC />
      </div>
    </div>
  )
}
