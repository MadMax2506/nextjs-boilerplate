import { cn } from "@lib"
import { Button } from "@ui/button"
import Link from "next/link"
import { Page } from "./navbar.types"

export const NavLinksSC = ({ pages, className }: { pages?: Page[]; className?: string }) => {
  if (!pages) return null

  return (
    <nav className={cn("w-full", className)}>
      {pages.map((page) => (
        <Button key={page.href} variant="link" asChild size="lg">
          <Link href={page.href}>{page.label}</Link>
        </Button>
      ))}
    </nav>
  )
}
