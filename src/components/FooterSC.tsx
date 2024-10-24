import { Button } from "@ui/button"
import { Copyright, Mail } from "lucide-react"
import Link from "next/link"

export const FooterSC = () => {
  return (
    <footer className="h-11 bg-secondary">
      <div className="mx-auto max-w-7xl flex justify-between items-center h-full">
        <div className="flex gap-2">
          <Copyright size={20} />
          Copyright 2024 Max Janorschke
        </div>

        <div className="flex items-center">
          <Button className="" variant="link" asChild>
            <Link className="flex gap-2 font-light" href="mailto:webdev@max-janorschke.de?subject=Footer Link Anfrage">
              <Mail size={20} />
              webdev@max-janorschke.de
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
