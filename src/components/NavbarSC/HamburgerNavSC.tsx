import { cn } from "@lib"
import { Button } from "@ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@ui/sheet"
import { Menu } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Page } from "./navbar.types"

export const HamburgerNavSC = async ({ pages, className }: { pages?: Page[]; className?: string }) => {
  const t = await getTranslations("navbar.hamburgerMenu")

  if (!pages) return null

  return (
    <Sheet>
      <SheetTrigger className={cn(className)}>
        <Menu />
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader className="sr-only">
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col items-start">
          {pages.map((page) => (
            <Button key={page.href} variant="link" asChild>
              <Link href={page.href}>{page.label}</Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
